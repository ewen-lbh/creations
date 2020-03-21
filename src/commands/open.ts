import {join} from 'path'
import {flags} from '@oclif/command'
import Command from '../base'
const execa = require('execa')
const chalk = require('chalk')

export default class Open extends Command {
  static description = 'Opens CREATION. The difference with `goto` is that this will also open the project in the configured software (eg. open the .psd in Photoshop)'

  static flags = {
    help: flags.help({char: 'h'}),
    'no-goto': flags.boolean({default: true, description: 'Don\'t  run `goto CREATION`'}),
  }

  static args = [{name: 'name'}]

  async run() {
    const {args, flags} = this.parse(Open)
    const creation = this.records.byID(args.name)
    if (!creation) {
      throw new Error(chalk`{red Cannot find creation with ID {white.bold ${args.name}}}`)
    }
    await execa('code', [ join(creation.directory) ])
  }
}
