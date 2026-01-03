/**
 * @file encryptCmd.ts
 * @description Module containing the encrypt command
 *
 * @exports encryptCmd
 */

import { Command } from "commander";
import { encrypt } from "../encrypt.js";

// Command Setup
const encryptCmd = new Command("encrypt")
  .action(encrypt)
  .argument("<input>", "Path to plaintext input file")
  .description("Encrypt a file")
  .option("-k, --key <string>", "Encryption key (UTF-8)")
  .option(
    "-o, --outFile <path>",
    "Path for encrypted output file (default: <input>.encrypted)"
  )
  .option("-p, --pad", "Add PKCS#7 padding before encryption", true);

export { encryptCmd };
