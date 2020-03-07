const chalk = require('chalk')
import { readOrCreate, appendOrCreate, writeOrCreate } from './io';
import { existsSync } from 'fs';

interface ICreationsRecord {
  directory: string;
  id: string;
}

class CreationsRecord {
  separator = ' in '

  path: string

  entries: ICreationsRecord[] = []

  constructor(recordPath: string) {
    this.path = recordPath
    this.parse()
  }

  parse(): void {
    let lines: ICreationsRecord[] | string[] = this._getLines(this.raw)
    lines = this._cleanupBefore(lines)
    lines = lines.map(line => this._parseLine(line))
    lines = this._cleanupAfter(lines)
    this.entries = lines
  }

  write(): void {
    writeOrCreate(this.path, this.stringified + /* final line */ '\n')
  }

  get stringified(): string {
    const plainLines = []
    for (const entry of this.entries) {
      plainLines.push(entry.id + this.separator + entry.directory)
    }
    return plainLines.join('\n')
  }

  exists(entryID: string): boolean {
    const entry = this.byID(entryID)
    return entry !== undefined && this.contains(entryID) && this.existsOnDisk(entry)
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

  add(obj: ICreationsRecord): void {
    if (this.exists(obj)) {
      throw new Error(chalk`{red Cannot add creation {white.bold '${obj.id}'}: this name is already taken}`)
    }
    const raw = this._dumpLine(obj)
    appendOrCreate(this.path, '\n' + raw)
  }

  _dumpLine(obj: ICreationsRecord): string {
    return obj.id + this.separator + obj.directory
  }

  get raw(): string {
    return readOrCreate(this.path)
  }

  _getLines(content: string): string[] {
    return content.split('\n')
  }

  _parseLine(line: string): ICreationsRecord {
    const [id, directory] = line.split(this.separator)
    return {id, directory}
  }

  _cleanupAfter(records: ICreationsRecord[]) {
    return records.filter(({id, directory}) => id && directory)
  }

  _cleanupBefore(lines: string[]): string[] {
    return lines.filter(line => {
      return line.trim() && !line.startsWith('#')
    })
  }
}

export { ICreationsRecord, CreationsRecord }
