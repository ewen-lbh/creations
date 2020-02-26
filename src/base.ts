import Command, { flags } from '@oclif/command'
const toml = require('toml')
const path = require('path')
import { readFileSync, writeFileSync, mkdirSync, existsSync, PathLike } from 'fs'

export default abstract class extends Command {
  static flags = {
    debug: flags.boolean()
  }

  async init() {
    const { flags } = this.parse(this.constructor)
  }

  getConfig(): Object {
    return loadConfig(readOrCreate(this.config.configDir, 'config.toml'))
  }

  getConfigPath(): PathLike {
    return path.join(this.config.configDir, 'config.toml')
  }
}

function loadConfig(contents: string | Buffer): Object {
  return toml.parse(contents)
}

function readOrCreate(directory: string, filename: string, defaultContent = ''): string {
  if (!existsSync(directory)) {
    console.log(`Creating directory ${directory}`)
    mkdirSync(directory, {recursive: true})
  }
  if (!existsSync(filename)) {
    console.log(`Creating file ${path.join(directory, filename)}`)
    writeFileSync(path.join(directory, filename), defaultContent)
  }
  return readFileSync(path.join(directory, filename)).toString()
}
