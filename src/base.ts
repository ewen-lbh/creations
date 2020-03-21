import Command, {flags} from '@oclif/command'
const toml = require('@iarna/toml')
const path = require('path')
const chalk = require('chalk')
import {readOrCreate} from './io'
import { ICreationsRecord, CreationsRecord } from './record'
import { TemplatesManager } from './templates'
import { join } from 'path'

export default abstract class extends Command {
  static flags = {
    debug: flags.boolean({char: 'v'}),
    help: flags.help({char: 'h'}),
  }

  async init() {
    const { flags } = this.parse(this.constructor)
    if (!this.records.checkIntegrity()) {
      throw new Error(chalk`Some projects have been manually removed. Use {cyan creations regen-records} and use {cyan creations delete} or {cyan creations move} to move or delete projects in the future.`)
    }
  }

  get currentCreation(): ICreationsRecord | undefined {
    const id = this.currentCreationID
    if (!id) return undefined
    return this.records.byID(id)
  }

  isInACreation(): boolean {
    return this.currentCreation !== undefined
  }

  get currentCreationID(): string | undefined {
    if (this.isInACreation()) {
      return this.currentDirCreationID
    }
    if (!this.flags.creation) {
      throw new Error(chalk`No creation specified. Go into a creation directory or use the {bold.cyan --creation} flag`)
    }
    if (this.records.byID(this.flags.creation) === undefined) {
      throw new Error(chalk`Creation with id {bold.cyan ${this.flags.creation}} not found`)
    }
  }

  get currentDirCreationID(): string | undefined {
    const currentDir = path.resolve(__dirname)
    let recordID
    for (const {id, directory} of this.records.entries) {
      if (path.resolve(directory) === currentDir) {
        recordID = id
      }
    }
    return recordID
  }

  get templates(): TemplatesManager {
    return new TemplatesManager(join(this.templatesPath))
  }

  get settings(): Record<string, any> {
    return this.loadTOML(readOrCreate(this.settingsPath))
  }

  get records(): CreationsRecord {
    return new CreationsRecord(this.recordsPath)
  }

  get templatesPath(): string {
    return join(this.config.configDir, 'templates')
  }
  
  get settingsPath(): string {
    return join(this.config.configDir, 'config.toml')
  }

  get recordsPath(): string {
    return join(this.config.configDir, 'creations.toml')
  }

  loadTOML(contents: string | Buffer): Record<string, any> {
    console.log(contents)
    return toml.parse(contents.toString())
  }

  logDebug(msg: string): void {
    // if (this.flags.debug) {
    console.info(msg)
    // }
  }
}
