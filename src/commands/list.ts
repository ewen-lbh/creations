import {flags} from '@oclif/command'
import Command from '../base'
import { ICreationsRecord } from '../record'
const chalk = require('chalk')

export default class List extends Command {
  static description = 'List all of your creations'

  static examples = [
    `$ creations list --paths-only
D:\\#\\Coding\\projects\\schoolsyst
D:\\#\\Graphism\\static\\logos\\mx3
...`,
  ]

  static flags = {
    help: flags.help({char: 'h'}),
    'paths-only': flags.boolean({description: 'Only print the creations\' paths'}),
  }

  async run() {
    const {args, flags} = this.parse(List)
    const format = (entry: ICreationsRecord) => {
      if (flags["paths-only"]) return entry.directory
      return chalk`{cyan ${this._align_entry_id(entry)}} in {blue ${entry.directory}}`
    }
    for (const entry of this.records.entries) {
      console.log(format(entry))
    }
  }

  _align_entry_id(entry: ICreationsRecord): string {
    const IDs = this.records.entries.map(({id}) => id)
    let longestID = IDs[0]
    IDs.forEach(id => {
      if (id.length > longestID.length) {
        longestID = id
      }
    })
    const spacesNeeded = longestID.length - entry.id.length
    return entry.id + ' '.repeat(spacesNeeded)
  }
}
