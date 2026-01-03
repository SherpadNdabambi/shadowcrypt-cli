/**
 * @file decryptCmd.ts
 * @description Module containing the decrypt ommand
 *
 * @exports decryptCmd
 */
import { Command } from "commander";
import { decrypt } from "../decrypt.js";

// Command Setup
const decryptCmd = new Command("decrypt")
  .action(decrypt)
  .argument("<input>", "Path to encrypted input file")
  .description("Decrypt a file")
  .option("-k, --key <string>", "Decryption key (UTF-8)")
  .option(
    "-o, --outFile <path>",
    "Path for decrypted output file (default: <input>.decrypted)"
  )
  .option("-u, --unpad", "Remove PKCS#7 padding after decryption", false);

export { decryptCmd };
