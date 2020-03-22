import Command from '../base'
import { spawn } from 'child_process'
const chalk = require('chalk')

export default class Goto extends Command {
  static description = 'Change the current working directory to CREATION\'s directory'

  static examples = [
    '$ creations goto schoolsyst',
  ]

  static flags = {
    ...Command.flags,
  }

  static args = [{name: 'creation'}]

  async run() {
    const {args} = this.parse(Goto)
    const record = this.records.byID(args.creation)
    if (!record) {
      throw new Error(chalk`Creation {cyan ${args.creation}} not found.`)
    }
    spawn(process.env.SHELL || 'bash', ['-i'], {
      cwd: record.directory,
      stdio: 'inherit',
    })
  }
}
