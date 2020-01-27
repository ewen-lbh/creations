import {flags} from '@oclif/command'
import Command from '../base'

export default class Publish extends Command {
  static description = 'Publish your creation'

  static flags = {
    help: flags.help({char: 'h'}),
  }

  async run() {
    const {args, flags} = this.parse(Publish)
    console.log("Not implemented.")
  }
}
