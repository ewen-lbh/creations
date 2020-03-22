/* eslint-disable */
import {flags} from '@oclif/command'
import Command from '../base'
import New from './new'
const { prompt } = require('enquirer')
import {listDir} from '../io'
import { lstatSync } from 'fs'
import { basename, resolve } from 'path'
const chalk = require('chalk')

export default class Scan extends Command {
  static description = 'Scans through an entire directory and interactively add all creations.'

  static flags = {
    ...Command.flags,
  }

  static args = [{name: 'directory'}]

  async run() {
    const {args, flags} = this.parse(Scan)
    const confirms = []
    for (const directory of listDir(args.directory)) {
      if (!lstatSync(resolve(args.directory, directory)).isDirectory()) {
        continue
      }
      if (this.records.byID(directory)) {
        continue
      }
      confirms.push({ name: directory, type: 'confirm', message: chalk`Register {cyan ${directory}}?` })
    }
    let directories = await prompt(confirms)
    directories = Object.entries(directories).filter(([k, v]) => v).map(([k, v]) => k)
    const creationPrompts = []
    for (const directory of directories) {
      creationPrompts.push({
        name: directory,
        type: 'form',
        choices: [
          { name: 'id', message: 'Name', initial: basename(directory) },
          { name: 'directory', message: 'Directory (absolute)', initial: resolve(directory) },
          { name: 'type', message: 'What is it?', initial: '' },
        ],
        message: chalk`Provide details for {cyan ${directory}}`,
      })
    }
    let creations = await prompt(creationPrompts)
    console.log(creations)
    // listDir(args.directory).forEach(async directory => {
    //   if (!lstatSync(resolve(args.directory, directory)).isDirectory()) return
    //   const prompt = new Confirm(chalk`Add {cyan ${directory}}?`)
    //   const yes = await prompt.run()
    //   if (yes) {
    //     const form = new Form({
    //       name: 'details',
    //       message: 'Provide the following',
    //       choices: [
    //         { name: 'id', message: 'Name', initial: basename(directory) },
    //         { name: 'directory', message: 'Directory (absolute)', initial: resolve(directory) },
    //         { name: 'type', message: 'What is it?', initial: null },
    //       ],
    //     })
    //     form.run().then(ans => {
    //       this.records.add({
    //         archived: false,
    //         ...ans.details
    //       })
    //     })
    //   }
    // })
  }
}
