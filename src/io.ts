import { basename } from 'path'
import {existsSync, mkdirSync, writeFileSync, readFileSync, readdirSync} from 'fs'

function readOrCreate(filepath: string, defaultContent = ''): string {
  // Split the filepath intoa directory & a filename
  const filename = basename(filepath)
  const directory = filepath.toString().replace(filename, '')
  if (!existsSync(directory)) {
    console.log(`Creating directory ${directory}`)
    mkdirSync(directory, {recursive: true})
  }
  if (!existsSync(filepath)) {
    console.log(`Creating file ${filepath}`)
    writeFileSync(filepath, defaultContent)
  }
  return readFileSync(filepath).toString()
}

function listDirOrCreate(dirpath: string): Array<string> {
  if (!existsSync(dirpath)) {
    console.log(`Creating directory ${dirpath}`)
    mkdirSync(dirpath, {recursive: true})
  }
  return readdirSync(dirpath)
}

function appendOrCreate(filepath: string, append: string): void {
  let content = readOrCreate(filepath)
  content += append
  writeFileSync(filepath, content)
}

function writeOrCreate(filepath: string, newContent: string): void {
  let content = readOrCreate(filepath)
  content = newContent
  writeFileSync(filepath, content)
}

export { appendOrCreate, listDirOrCreate, readOrCreate, writeOrCreate  }
