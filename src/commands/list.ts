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
    `$ creations list --format paths-only
/mnt/d/projects/creations
/mnt/d/Coding/projects/mx3creations
$ creations list --format table --show-archived
S  │ Name      │ Type      │ Location                     
  │ creations │ cli/oclif │ /mnt/d/projects/creations          
  │ portfolio │ nuxt/site │ /mnt/d/Coding/projects/mx3creations
📦 │ aven      │ website   │ /mnt/d/projects/aven  
`,
  ]

  static flags = {
    ...Command.flags,
    'show-archived': flags.boolean({description: 'Show archived creations', char: 'a'}),
    'show-templates': flags.boolean({description: 'Show templates'}),
    open: flags.boolean({description: 'Opens the records file'}),
    sort: flags.string({description: 'Sort by category, id, directory or archived status.', char: 's', options: ['type', 'id', 'directory', 'archived']}),
    'no-emojis': flags.boolean({description: 'Uses letters for archived status in place of emojis.'}),
    format: flags.string({description: 'How to format the list', char: 'f', options: ['table', 'sentences', 'paths-only'], default: 'sentences'}),
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
    creations = creations.sort(firstBy(flags.sort || 'archived').thenBy('id'))
    if (flags.format === 'paths-only') {
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
    const headerConfig = (displayName: string | null = null) => ({
      showHeaders: flags.format !== 'sentences',
      headingTransform: () => chalk`{cyan ${displayName}}`,
    })
    const columnifyConfig = {
      columns: ['id', 'type', 'directory'],
      columnSplitter: (flags.format === 'sentences' ? '' : ' │ '),
      config: {
        id: headerConfig('Name'),
        archived: headerConfig('S'),
        type: headerConfig('Type'),
        directory: headerConfig('Location'),
      },
    }
    if (flags.format === 'sentences') {
      // Add sentence elements
      creations = creations.map(c => ({
        archived: c.archived,
        id: c.id,
        type: chalk`{dim , a} ${c.type}`,
        directory: chalk`{dim  in} ${c.directory}`,
      }))
    }
    // Show the "archived" column when the -a flag is set
    if (flags['show-archived']) columnifyConfig.columns = ['archived', ...columnifyConfig.columns]

    console.log(columnify(creations, columnifyConfig))
  }
}
