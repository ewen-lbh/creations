import Command from '../base'

export default class Archive extends Command {
  static description = 'Archive a creation'

  static flags = {
    ...Command.flags,
  }

  static args = [{name: 'name'}]

  async run() {
    const {args} = this.parse(Archive)
    this.records.edit(args.name, {archived: true})
  }
}
