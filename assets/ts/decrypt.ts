/**
 * @file decrypt.ts
 * @description Module containing the decrypt function
 *
 * @exports decrypt
 */

import blf from "blowfish-js";
import fs from "fs";
import { password, select } from "@inquirer/prompts";
import * as readline from "readline";

/**
 * Decrypt a file using the specified options.
 *
 * @param {string} cmdInput The input file path
 * @param {DecryptCmdOptions} cmdOptions Command-line options
 *
 * @returns {Promise<void>} a promise that resolves when the decryption is complete
 */
async function decrypt(cmdInput: string, cmdOptions: DecryptCmdOptions) {
  let key = cmdOptions.key;

  if (!key) {
    key = await password({
      message: "Enter decryption key:",
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
    opts: DecryptOptions = {
      input: cmdInput,
      output: cmdOptions.outFile,
      key,
      algo: selectedAlgo,
      unpad: cmdOptions.unpad || false,
    };

  console.log("Starting decryption process...");

  decryptFile(opts);
  rl.close();
}

/**
 * Decrypt a file using the specified options.
 *
 * @param {DecryptOptions} options Decryption options
 *
 * @returns {void}
 */
function decryptFile(options: DecryptOptions): void {
  const inputPath = options.input,
    keyBuffer = Buffer.from(options.key, "utf-8"),
    outputPath = options.output || `${inputPath}.decrypted`; // Generic extension

  // Read input
  if (!fs.existsSync(inputPath) || !fs.statSync(inputPath).isFile()) {
    console.error(`Error: Input file '${inputPath}' not found.`);

    process.exit(1);
  }

  const ciphertext = fs.readFileSync(inputPath);

  // Validate block size (Blowfish: 8 bytes; generalize later)
  const blockSize = 8; // Hardcoded for now

  if (ciphertext.length === 0 || ciphertext.length % blockSize !== 0) {
    console.error(
      `Error: Input must be a multiple of ${blockSize} bytes (for ${options.algo}). Got ${ciphertext.length}.`
    );

    process.exit(1);
  }

  // Dispatch by algorithm
  let decrypted: Buffer;

  switch (options.algo.toLowerCase()) {
    case "blowfish":
      decrypted = decryptWithBlowfish(ciphertext, keyBuffer, options.unpad);
      break;
    default:
      console.error(
        `Error: Unsupported algorithm '${options.algo}'. Only 'blowfish' is available.`
      );
      process.exit(1);
  }

  // Write output
  fs.writeFileSync(outputPath, decrypted);

  console.log(`Decrypted file: ${outputPath} (${decrypted.length} bytes)`);
}

/**
 * Decrypt a ciphertext using Blowfish algorithm.
 *
 * @param {Buffer} ciphertext The encrypted data to decrypt
 * @param {Buffer} keyBuffer The key to use for decryption
 * @param {boolean} unpad Whether to remove padding from the decrypted data
 *
 * @returns {Buffer} The decrypted data
 */
function decryptWithBlowfish(
  ciphertext: Buffer,
  keyBuffer: Buffer,
  unpad: boolean
): Buffer {
  const context = blf.key(keyBuffer),
    decrypted = blf.ecb(context, ciphertext, true); // true = decrypt

  // Optional PKCS#7 unpadding
  let finalData = decrypted;

  if (unpad) {
    const padLen = finalData[finalData.length - 1] & 0xff;

    if (padLen > 0 && padLen <= 8) {
      finalData = finalData.slice(0, -padLen);

      console.log(`Unpadded ${padLen} bytes.`);
    } else {
      console.warn("Warning: Invalid padding detected; output unchanged.");
    }
  }

  return finalData;
}

interface DecryptCmdOptions {
  key?: string;
  outFile?: string;
  unpad?: boolean;
}

/**
 * Decryption options interface.
 */
interface DecryptOptions {
  algo: string;
  input: string;
  key: string;
  output?: string;
  unpad: boolean;
}

// Prompt helpers
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export { decrypt, decryptFile, decryptWithBlowfish };
