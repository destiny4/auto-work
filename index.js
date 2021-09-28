#!/usr/bin/env node

import { Command } from 'commander/esm.mjs';
import task from './workflow.js'
import fs from 'fs-extra'

const pkg = JSON.parse(fs.readFileSync('./package.json'))

const program = new Command()

program
  .version(pkg.version)
  .option('-m, --msg [value]', 'please input commit message')
  .option('-i, --init', '是否初始化')
  .parse(process.argv)

const args = {
  init: false,
  ...program.opts()
}

task(args)
