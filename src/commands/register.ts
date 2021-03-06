import {resolve, basename} from 'path'
import {flags} from '@oclif/command'
import Command from '../base'
const sanitizeFilename = require('sanitize-filename')

export default class Register extends Command {
  static description = 'Add an existing project directory to '

  static flags = {
    ...Command.flags,
    force: flags.boolean({char: 'f', description: 'Overwrite conflicting creation.'}),
  }

  static args = [
    {name: 'directory', required: true, description: 'The directory to register'},
    {name: 'type',      required: true, description: 'What is this project?'},
    {name: 'name',      required: false, description: 'Choose the name. Defaults to DIRECTORY\'s basename.'},
  ]

  async run() {
    const {args, flags} = this.parse(Register)
    let name = args.name || basename(args.directory)
    name = sanitizeFilename(name)
    if (this.records.exists(name)) {
      if (flags.force) {
        this.records.remove(name)
      }
    }
    this.records.add({
      directory: resolve(args.directory),
      id: args.name,
      archived: false,
      type: args.type,
    })
  }
}
