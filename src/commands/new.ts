import {flags} from '@oclif/command'
import Command from '../base'
import {writeOrCreate} from '../io'
import {CreationsRecord} from '../record'
import { existsSync } from 'fs'
const chalk = require('chalk')

export default class New extends Command {
  static description = 'Create a new TYPE named CREATION'

  static examples = [
    '$ creations new restapi schoolsyst',
    '$ creations new logo mx3',
  ]

  static args = [{name: 'type', required: true}, {name: 'name', required: true}]

  static flags = {
    ...Command.flags,
    in: flags.string({required: false, description: 'Generate the template in the specified directory. Uses the type\'s new.in config as a default.', helpValue: 'DIRECTORY'}),
    force: flags.boolean({description: 'Overwrite existing projects in case the project name is already taken'}),
    archive: flags.boolean({description: 'Archive existing projects in case the project name is already taken'})
  }

  async run() {
    const {args, flags} = this.parse(New)
    if (this.records.exists())
    this.records.add({
      directory: process.cwd() + 'templates' + args.type,
      id: args.name,
    })
    console.log(chalk`Added {cyan ${args.name}} to the creations record {dim (${this.recordsPath})}`)
  }
}
