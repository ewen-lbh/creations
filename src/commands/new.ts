import {flags} from '@oclif/command'
import Command from '../base'

export default class New extends Command {
  static description = 'Create a new TYPE named CREATION'
  static examples = [
    '$ creations new restapi schoolsyst',
    '$ creations new logo mx3',
  ]

  static flags = {
    help: flags.help({char: 'h'}),
  }

  static args = [{name: 'type', required: true}, {name: 'creation', required: true}]

  async run() {
    const {args, flags} = this.parse(New)
    console.log("Not implemented.")
  }
}
