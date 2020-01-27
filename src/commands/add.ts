import {flags} from '@oclif/command'
import Command from '../base'

export default class Add extends Command {
  static description = 'Add a new THING named NAME to the current creation. "things" need to be added in the creation type\'s configuration.'
  static examples = [
    '$ creations add component ModalAddHomework',
    '$ creations add resource background.png'
  ]

  static flags = {
    help: flags.help({char: 'h'}),
  }

  static args = [{name: 'thing', required: true}, {name: 'name', required: true}]

  async run() {
    const {args, flags} = this.parse(Add)
    console.log('Not implemented.')
  }
}
