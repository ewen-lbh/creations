import {flags} from '@oclif/command'
import Command from '../base'

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
    console.log("Not implemented.")
  }
}
