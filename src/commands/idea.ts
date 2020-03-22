import {Command} from '@oclif/command'

export default class Idea extends Command {
  static description = 'Put new ideas for the current project or for PROJECT'

  static args = [
    { name: 'project' },
    { name: 'idea', required: true },
  ]

  async run() {
    console.log('Not implemented.')
  }
}
