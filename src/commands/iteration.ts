import {Command, flags} from '@oclif/command'

export default class Iteration extends Command {
  static description = 'Set, increment or get the creation\'s version'
  static examples = [
    '$ creations iteration 1.0.0',
    '$ creations iteration minor',
    `$ creations iteration
v2.0.3`
  ]

  static flags = {
    help: flags.help({char: 'h'}),
  }

  static args = [{name: 'version', description: 'If version is "major", "minor" or "patch", the current version will be incremented. If not specified, the current creation\'s version is returned'}]

  async run() {
    const {args, flags} = this.parse(Iteration)
    console.log("Not implemented.")
  }
}
