import Command from '../base'
const chalk = require('chalk')

export default class Unarchive extends Command {
  static description = 'Unarchive a project'

  static flags = {
    ...Command.flags,
  }

  static args = [{name: 'name', required: false}]

  async run() {
    const {args} = this.parse(Unarchive)
    let creation
    if (args.name) {
      creation = this.records.byID(args.name)
    } else {
      creation = this.currentCreation
    }
    if (creation === undefined) {
      throw new Error(chalk`{red Could not unarchive {white.bold ${args.name}}: not found}`)
    }
    this.records.edit(creation.id, { archived: false })
  }
}
