import blf from "blowfish-js";
import { Command } from "commander";
import fs from "fs";
import { password, select } from "@inquirer/prompts";
import * as readline from "readline";

/**
 * Encrypt a file using the specified options.
 * @param options Encryption options
 */
function encryptFile(options: EncryptOptions): void {
  const inputPath = options.input,
    keyBuffer = Buffer.from(options.key, "utf-8"),
    outputPath = options.output || `${inputPath}.encrypted`;

  // Read input
  if (!fs.existsSync(inputPath) || !fs.statSync(inputPath).isFile()) {
    console.error(`Error: Input file '${inputPath}' not found.`);

    process.exit(1);
  }

  // Validate block size if no padding (Blowfish: 8 bytes)
  const blockSize = 8; // Hardcoded for now

  const plaintext = fs.readFileSync(inputPath);

  if (
    !options.pad &&
    (plaintext.length === 0 || plaintext.length % blockSize !== 0)
  ) {
    console.error(
      `Error: Input must be a multiple of ${blockSize} bytes (for ${options.algo}) when no padding is applied. Got ${plaintext.length}.`
    );

    process.exit(1);
  }

  // Dispatch by algorithm
  let encrypted: Buffer;

  switch (options.algo.toLowerCase()) {
    case "blowfish":
      encrypted = encryptWithBlowfish(keyBuffer, options.pad, plaintext);
      break;
    default:
      console.error(
        `Error: Unsupported algorithm '${options.algo}'. Only 'blowfish' is available.`
      );
      process.exit(1);
  }

  // Write output
  fs.writeFileSync(outputPath, encrypted);

  console.log(`Encrypted file: ${outputPath} (${encrypted.length} bytes)`);
}

/**
 * Encrypt data using Blowfish in ECB mode.
 * @param keyBuffer The key to use for encryption
 * @param pad Whether to apply PKCS#7 padding
 * @param plaintext The data to encrypt
 * @returns The encrypted data
 */
function encryptWithBlowfish(
  keyBuffer: Buffer,
  pad: boolean,
  plaintext: Buffer
): Buffer {
  const blockSize = 8;
  let data = plaintext;

  if (pad) {
    data = padPKCS7(data, blockSize);

    const padLen = data.length - plaintext.length;

    console.log(`Padded ${padLen} bytes.`);
  }

  const context = blf.key(keyBuffer);

  return blf.ecb(context, data, false); // false = encrypt
}

/**
 * Pad data using PKCS#7 scheme.
 * @param data Data to pad
 * @param blockSize Block size in bytes
 * @returns Padded data
 */
function padPKCS7(data: Buffer, blockSize: number): Buffer {
  const padLen = blockSize - (data.length % blockSize) || blockSize,
    pad = Buffer.alloc(padLen, padLen);

  return Buffer.concat([data, pad]);
}

/**
 * Options for file encryption.
 */
interface EncryptOptions {
  algo: string;
  input: string;
  key: string;
  output?: string;
  pad: boolean;
}

// Prompt helpers
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Command Setup
const encryptCmd = new Command();

encryptCmd
  .action(async (cmdInput: string, cmdOptions: any) => {
    let key = cmdOptions.key;
    if (!key) {
      key = await password({
        message: "Enter encryption key:",
        mask: "*",
      });
    }
    const algorithms = [
        { name: "Blowfish", value: "blowfish" },
        // Add more here in future
      ],
      selectedAlgo = await select<string>({
        choices: algorithms,
        message: "Choose algorithm:",
      }),
      opts: EncryptOptions = {
        algo: selectedAlgo,
        input: cmdInput,
        key,
        output: cmdOptions.outFile,
        pad: cmdOptions.pad,
      };

    console.log("Starting encryption process...");

    encryptFile(opts);
    rl.close();
  })
  .argument("<input>", "Path to plaintext input file")
  .description("Encrypt a file")
  .name("encrypt")
  .option("-k, --key <string>", "Encryption key (UTF-8)")
  .option(
    "-o, --outFile <path>",
    "Path for encrypted output file (default: <input>.encrypted)"
  )
  .option("-p, --pad", "Add PKCS#7 padding before encryption", true);

export { encryptCmd, encryptFile, encryptWithBlowfish, padPKCS7 };
