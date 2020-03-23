import {renameSync, mkdirSync, existsSync} from 'fs'
import {resolve, join} from 'path'
import {flags} from '@oclif/command'
import Command from '../base'
const consola = require('consola')
const chalk = require('chalk')
const execa = require('execa')

export default class Move extends Command {
  static description = 'Move a project to a different directory.'

  static flags = {
    ...Command.flags,
    force: flags.boolean({char: 'f', description: 'Overwrite existing target directory.'}),
  }

  static args = [{name: 'name'}, {name: 'new-directory'}]

  static examples = [
    chalk`{dim $} creations list -f paths-only
{blue /mnt/d/projects/Coding/portfolio}
{dim $} creations {cyan move portfolio /mnt/d/projects/}
{dim $} creations list -f paths-only
{blue /mnt/d/projects/portfolio}`,
  ]

  async run() {
    const {args, flags} = this.parse(Move)
    const creation = this.records.byID(args.name)
    if (!creation) {
      throw new Error(`{red Cannot find creation with ID {white.bold ${args.name}}}`)
    }
    const newDir = join(resolve(args['new-directory']), creation.id)
    if (existsSync(newDir)) {
      if (flags.force) {
        consola.warn(chalk`Deleting directory ${newDir} because it already exists.`)
        execa('rm', ['-r', newDir])
        // rmdirSync(newDir, { recursive: true }) (Recursive removal is experimental.)
      } else {
        throw new Error(chalk`{red Cannot move creation: target directory already exists.}`)
      }
    }
    mkdirSync(newDir)
    renameSync(creation.directory, newDir)
    this.records.edit(args.name, {
      directory: resolve(newDir),
    })
  }
}
