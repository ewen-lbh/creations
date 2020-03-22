import {join} from 'path'
import {Command, flags} from '@oclif/command'
const consola = require('consola')
const chalk = require('chalk')
import {CreationsRecord} from '../record'

export default class RegenRecords extends Command {
  static description = 'Regenerates the record, removing projects that no longer exist on disk.'

  static flags = {
    help: flags.help({char: 'h'}),
  }

  async run() {
    const records = new CreationsRecord(join(this.config.configDir, 'creations.toml'))
    records.entries.forEach(entry => {
      if (!records.existsOnDisk(entry)) {
        consola.info(chalk`Creation {cyan ${entry.id}} no longer exists, removing from record.`)
        records.remove(entry.id)
      }
    })
  }
}
