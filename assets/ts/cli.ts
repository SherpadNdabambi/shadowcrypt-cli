#!/usr/bin/env node

import { Command } from "commander";
import { decryptCmd } from "./decrypt.js";
import { encryptCmd } from "./encrypt.js";

const program = new Command()
  .description(
    "Node.js CLI utility to encrypt/decrypt files with various symmetric ciphers."
  )
  .name("shadowcrypt-cli")
  .version("1.0.1");

program.addCommand(decryptCmd);
program.addCommand(encryptCmd);

program.parse();
