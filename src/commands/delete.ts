import {flags} from '@oclif/command'
import Command from '../base'
const consola = require('consola')
const chalk = require('chalk')
const execa = require('execa')
import { ask } from '../ui'

export default class Move extends Command {
  static description = 'Deletes a creations from the records AND delete the folder.'

  static flags = {
    ...Command.flags,
    yes: flags.boolean({char: 'y', description: 'Do not ask for confirmation.'}),
  }

  static args = [{name: 'name'}]

  async run() {
    const {args, flags} = this.parse(Move)
    const creation = this.records.byID(args.name)
    if (creation === undefined) {
      throw new Error(chalk`{red Creation {white.bold ${args.name}} not found.}`)
    }
    if (flags.yes || await ask(chalk`This will delete {cyan ${creation.directory}}. You {bold cannot} undo this. Are you sure?`, 'confirm')) {
      execa('rm', ['-rf', creation.directory])
      this.records.remove(creation.id)
    } else {
      consola.info('Aborting.')
    }
  }
}
