import {flags} from '@oclif/command'
import Command from '../base'

export default class Archive extends Command {
  static description = 'Archive a creation'

  static flags = {
    help: flags.help({char: 'h'}),
  }

  static args = [{name: 'name'}]

  async run() {
    const {args, flags} = this.parse(Archive)
    this.records.edit(args.name, {archived: true})
  }
}
