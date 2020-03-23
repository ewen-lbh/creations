import {flags} from '@oclif/command'
import Command from '../base'
import Open from './open'
const chalk = require('chalk')
const consola = require('consola')
const execa = require('execa')

export default class New extends Command {
  static description = 'Create a new TYPE named CREATION'

  static examples = [
    '$ creations new restapi schoolsyst',
    '$ creations new logo mx3',
  ]

  static args = [{name: 'type', required: true}, {name: 'name', required: true}]

  static flags = {
    ...Command.flags,
    in: flags.string({required: false, description: 'Generate the template in the specified directory. Uses the type\'s new.in config as a default.', helpValue: 'DIRECTORY'}),
    force: flags.boolean({description: 'Overwrite existing projects in case the project name is already taken'}),
    archive: flags.boolean({description: 'Archive existing projects in case the project name is already taken'}),
    'no-open': flags.boolean({description: "Don't run creations open after creating the creation", char: 'O'}),
  }

  async run() {
    const {args, flags} = this.parse(New)
    if (this.records.exists(args.name)) {
      if (flags.archive) {
        consola.warn(chalk`A creation named {cyan ${args.name}} already exists. Archiving the old project.`)
        this.records.edit(args.name, {archived: true})
      } else if (flags.force) {
        consola.warn(chalk`A creation named {cyan ${args.name}} already exists. Overwriting the old project.`)
        this.records.remove(args.name)
      } else {
        throw new Error(chalk`{red The name {white.bold '${args.name}'} is already taken}`)
      }
    }
    const template = this.templates.byType(args.type)
    if (template === undefined) {
      throw new Error(chalk`
      {red No templates for creation type {white.bold ${args.type}}.}
      Here's how to add one:
          $ creations new template {cyan <your creation type>}
      `)
    }
    const outputDir = template.generate('new', {...args})
    this.records.add({
      directory: outputDir,
      id: args.name,
      archived: false,
      type: args.type,
    })
    console.log(chalk`Added {cyan ${args.name}} to the creations record {dim (${this.recordsPath})}`)
    if (template.templateConfig.new.after) {
      process.chdir(outputDir)
      for (let command of template.templateConfig.new.after) {
        command = template._substitute(command)
        console.log(chalk`{dim $ ${command}}`)
        // eslint-disable-next-line no-await-in-loop
        await execa(command, { shell: true })
      }
    }
    if (!flags['no-open']) {
      Open.run([args.name])
    }
  }
}
