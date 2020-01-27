import {flags} from '@oclif/command'
import Command from '../base'

export default class List extends Command {
  static description = 'List all of your creations'
  static examples = [
    `$ creations list --paths-only
D:\\#\\Coding\\projects\\schoolsyst
D:\\#\\Graphism\\static\\logos\\mx3
...`
  ]

  static flags = {
    help: flags.help({char: 'h'}),
    'paths-only': flags.boolean({description: 'Only print the creations\' paths'}),
  }

  async run() {
    const {args, flags} = this.parse(List)
    console.log("Not implemented.")
  }
}
