import {flags} from '@oclif/command'
import Command from '../base'
const chalk = require('chalk')
const columnify = require('columnify')
const Case = require('case')
import {openFileOrURI} from '../io'
import {firstBy} from 'thenby'

export default class List extends Command {
  static description = 'List all of your creations'

  static examples = [
    `$ creations list --paths-only
D:\\#\\Coding\\projects\\schoolsyst
D:\\#\\Graphism\\static\\logos\\mx3
...`,
  ]

  static flags = {
    ...Command.flags,
    'paths-only': flags.boolean({description: 'Only print the creations\' paths'}),
    'show-archived': flags.boolean({description: 'Show archived creations', char: 'a'}),
    'show-templates': flags.boolean({description: 'Show templates'}),
    open: flags.boolean({description: 'Opens the records file'}),
    sort: flags.string({description: 'Sort by category, id, directory or archived status.', char: 's', options: ['type', 'id', 'directory', 'archived']}),
    'no-emojis': flags.boolean({description: 'Uses letters for archived status in place of emojis.'}),
  }

  async run() {
    const {flags} = this.parse(List)
    if (flags.open) {
      await openFileOrURI(this.recordsPath)
      return
    }
    let creations = this.records.entries
    if (!flags['show-archived']) creations = creations.filter(c => !c.archived)
    if (!flags['show-templates']) creations = creations.filter(c => c.type !== 'template')
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    creations = creations.sort(firstBy(flags.sort || 'id'))
    if (flags['paths-only']) {
      creations.forEach(entry => {
        console.log(entry.directory)
      })
      return
    }
    // Use an icon for archived status
    const archivedIcon = flags['no-emojis'] ? chalk`{yellow A}` : '📦'
    creations = creations.map(c => ({
      ...c,
      archived: c.archived ? archivedIcon : '',
    }))
    // Config columnify
    const hideHeader = {showHeaders: false}
    const coloredHeader = {headingTransform: (h: string) => chalk`{cyan ${Case.title(h)}}`}
    const columnifyConfig = {
      columns: ['id', 'type', 'directory'],
      config: {
        id: hideHeader,
        archived: hideHeader,
        type: coloredHeader,
        directory: coloredHeader,
      },
    }
    // Show the "archived" column when the -a flag is set
    if (flags['show-archived']) columnifyConfig.columns = ['archived', ...columnifyConfig.columns]

    console.log(columnify(creations, columnifyConfig))
  }
}
