// TODO: Use status = 'archived' or status = 'ongoing' instead of archived = true?
const chalk = require('chalk')
import { readOrCreate, writeOrCreate } from './io'
import { existsSync } from 'fs'
import { resolve } from 'path'
const toml = require('@iarna/toml')
const expandHomeDir = require('expand-home-dir')

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
interface ICreationsRecord {
  directory: string;
  id: string;
  archived: boolean;
  type: string;
}

class CreationsRecord {
  path: string

  entries: ICreationsRecord[] = []

  constructor(recordPath: string) {
    this.path = recordPath
    this.entries = this.parse()
  }

  parse(): ICreationsRecord[] {
    return toml.parse(this.raw).creation
  }

  write(): void {
    writeOrCreate(this.path, this.stringified + /* final line */ '\n')
  }

  get stringified(): string {
    return toml.stringify({creation: this.entries})
  }

  exists(entryID: string): boolean {
    const entry = this.byID(entryID)
    return entry !== undefined && (this.contains(entryID) || this.existsOnDisk(entry))
  }

  contains(entryID: string): boolean {
    return this.byID(entryID) !== undefined
  }

  /**
   * Checks if every record entry exists on disk.
   *
   * @returns {boolean} Whether the record is integrous
   */
  checkIntegrity(): boolean {
    return this.entries.filter(entry => !this.existsOnDisk(entry)).length === 0
  }

  existsOnDisk(entry: ICreationsRecord): boolean {
    return existsSync(entry.directory)
  }

  byID(id: string): ICreationsRecord | undefined {
    return this.entries.find(entry => entry.id === id)
  }

  byDirectory(dir: string): ICreationsRecord | undefined {
    return this.entries.find(entry => entry.directory === dir)
  }

  add(entry: ICreationsRecord): void {
    if (this.exists(entry.id)) {
      throw new Error(chalk`{red Cannot add creation {white.bold '${entry.id}'}: this name is already taken}`)
    }
    this.entries.push({...entry, directory: resolve(expandHomeDir(entry.directory))})
    writeOrCreate(this.path, this.stringified)
  }

  remove(entryID: string): void {
    if (!this.contains(entryID)) {
      throw new Error(chalk`{red Cannot delete creation {white.bold '${entryID}'}: not found}`)
    }
    this.entries = this.entries.filter(entry => entry.id !== entryID)
    this.write()
  }

  edit(entryID: string, modifications: Record<string, any>) {
    const entry = this.byID(entryID)
    if (entry === undefined) {
      throw new Error(chalk`{red Cannot modify creation {white.bold '${entryID}'}: not found}`)
    }
    this.remove(entryID)
    this.add({
      ...entry,
      ...modifications,
    })
  }

  get raw(): string {
    return readOrCreate(this.path)
  }
}

export {ICreationsRecord, CreationsRecord}
