import {flags} from '@oclif/command'
import Command from '../base'
const chalk = require('chalk')

export default class Add extends Command {
  static description = 'Add a new THING named NAME to the current creation. "things" need to be added in the creation type\'s configuration.'

  static examples = [
    '$ creations add component ModalAddHomework',
    '$ creations add resource background.png',
  ]

  static args = [{name: 'thing', required: true}, {name: 'name', required: true}]

  static flags = {
    ...Command.flags,
    creation: flags.string({ char: 'c' })
  }

  async run() {
    const {flags} = this.parse(Add)
    if (this.currentCreation === undefined) {
      console.error(chalk`You are not currently in a creation directory.`)
    }
    if (flags.debug) {
      console.info(chalk`Using creation ${this.currentCreation.id}`)
    }
    console.log('Not implemented.')
  }
}
