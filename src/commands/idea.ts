import {Command, flags} from '@oclif/command'

export default class Idea extends Command {
  static description = 'Put new ideas for the current project or for PROJECT'

  static args = [
    { name: 'project' },
    { name: 'idea', required: true }
  ]

  async run() {
    const {args, flags} = this.parse(Idea)

    console.log("Not implemented.")
  }
}
