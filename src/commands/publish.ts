import Command from '../base'

export default class Publish extends Command {
  static description = 'Publish your creation'

  static flags = {
    ...Command.flags,
  }

  async run() {
    console.log('Not implemented.')
  }
}
