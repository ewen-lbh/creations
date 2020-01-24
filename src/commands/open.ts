import {Command, flags} from '@oclif/command'

export default class Open extends Command {
  static description = 'Opens CREATION. The difference with `goto` is that this will also open the project in the configured software (eg. open the .psd in Photoshop)'

  static flags = {
    help: flags.help({char: 'h'}),
    'no-goto': flags.boolean({default: true, description: 'Don\'t  run `goto CREATION`'}),
  }

  static args = [{name: 'file'}]

  async run() {
    const {args, flags} = this.parse(Open)
    console.log("Not implemented.")
  }
}
