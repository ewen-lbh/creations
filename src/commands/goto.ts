import {flags} from '@oclif/command'
import Command from '../base'
const chalk = require('chalk')

export default class Goto extends Command {
  static description = 'Change the current working directory to CREATION\'s directory'
  static examples = [
    '$ creations goto schoolsyst'
  ]

  static flags = {
    help: flags.help({char: 'h'}),
  }

  static args = [{name: 'creation'}]

  async run() {
    const {args, flags} = this.parse(Goto)
    const record = this.records.byID(args.creation)
    if (!record) {
      throw new Error(chalk`Creation {cyan ${args.creation}} not found.`)
    }
    process.chdir(record.directory)
  }
}
