import Command from '../base'
import { unlinkSync } from 'fs'

export default class Debug extends Command {
  async run() {
    unlinkSync(this.settingsPath)
  }
}
