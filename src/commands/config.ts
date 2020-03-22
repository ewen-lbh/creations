import Command from '../base'

export default class Config extends Command {
  static description = 'Manage creations\' configuration'

  static flags = {
    ...Command.flags,
  }

  async run() {
    console.log('Not implemented.')
  }
}
