#!/usr/bin/env node
/**
 * @file cli.ts
 * @description Main CLI entry point
 *
 * @exports cli
 */

import { Command } from "commander";
import { decryptCmd } from "./commands/decryptCmd.js";
import { encryptCmd } from "./commands/encryptCmd.js";

const program = new Command()
  .description(
    "Node.js CLI utility to encrypt/decrypt files with various symmetric ciphers."
  )
  .name("shadowcrypt-cli")
  .version("1.0.1");

program.addCommand(decryptCmd);
program.addCommand(encryptCmd);

program.parse();
