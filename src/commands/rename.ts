import {dirname, join} from 'path'
import {createAndMove} from '../io'
import {flags} from '@oclif/command'
import Command from '../base'
const chalk = require('chalk')

export default class Rename extends Command {
  static description = 'Rename a creation (and move it to its new directory)'

  static flags = {
    ...Command.flags,
    'id-only': flags.boolean({char: 'i', description: 'Do not change the directory, only the ID.'}),
  }

  static args = [{name: 'name'}, {name: 'new-name'}]

  async run() {
    const {args, flags} = this.parse(Rename)
    const creation = this.records.byID(args.name)
    const mods: Record<string, string> = {}
    if (args.name === args['new-name']) return
    if (!creation) {
      throw new Error(chalk`{red Cannot find creation with ID {white.bold ${args.name}}}`)
    }
    if (this.records.byID(args['new-name']) !== undefined) {
      throw new Error(chalk`{red Another creation is already named {white.bold ${args['new-name']}}}`)
    }
    mods.id = args['new-name']
    if (flags['id-only']) {
      this.records.edit(args.name, mods)
      return
    }
    const newDir = join(dirname(creation.directory), args['new-name'].replace(/\//g, '.'))

    mods.directory = newDir
    createAndMove(creation.directory, newDir)
    this.records.edit(args.name, mods)
  }
}
