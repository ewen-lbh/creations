/* eslint-disable no-await-in-loop */
import {flags} from '@oclif/command'
import Command from '../base'
import New from './new'
import { ask } from '../ui'
import {listDir} from '../io'
import { lstatSync } from 'fs'
import { basename, resolve } from 'path'
import Register from './register'
const chalk = require('chalk')

export default class Scan extends Command {
  static description = 'Scans through an entire directory and interactively add all creations.'

  static flags = {
    ...Command.flags,
  }

  static args = [{name: 'directory'}]

  async run() {
    const {args, flags} = this.parse(Scan)
    const types = listDir(this.templatesPath).map(d => d.replace(/\./g, '/'))
    for (const directory of listDir(args.directory)) {
      const fullDir = resolve(args.directory, directory)
      if (!lstatSync(fullDir).isDirectory()) {
        continue
      }
      if (this.records.byID(directory)) {
        continue
      }
      if (!await ask(chalk`Add {cyan ${basename(directory)}}?`, 'confirm', true)) {
        continue
      }
      const type = await ask(chalk`{cyan ${basename(directory)}} is a(n)`)
      if (!types.includes(type) && await ask(chalk`I don't know what a {cyan ${type}} is yet. Create this type?`, 'confirm')) {
        await New.run(['template', type])
      }
      await Register.run([fullDir, type, basename(directory)])
    }
  }
}
