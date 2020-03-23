import Command from '../base'

export default class Unregister extends Command {
  static description = 'Removes a creation from the record, but does not delete its directory.'

  static flags = {
    ...Command.flags,
  }

  static args = [{name: 'name'}]

  async run() {
    const {args, flags} = this.parse(Unregister)
    this.records.remove(args.name)
  }
}
