import {Command, flags} from '@oclif/command'

export default class Config extends Command {
  static description = 'Manage creations\' configuration'

  static flags = {
    help: flags.help({char: 'h'}),
  }

  async run() {
    const {args, flags} = this.parse(Config)
    console.log('Not implemented.')
  }
}
