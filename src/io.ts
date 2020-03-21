import {basename, dirname} from 'path'
import {existsSync, mkdirSync, writeFileSync, readFileSync, readdirSync, renameSync} from 'fs'
import {resolve} from 'path'
const chalk = require('chalk')
const expandHomeDir = require('expand-home-dir')
const isWsl = require('is-wsl')
const open = require('open')
const execa = require('execa')

function readOrCreate(filepath: string, defaultContent = ''): string {
  filepath = expandHomeDir(filepath)
  // Split the filepath intoa  directory & a filename
  const filename = basename(filepath)
  const directory = filepath.toString().replace(filename, '')
  if (!existsSync(directory)) {
    console.log(chalk`{dim Creating directory ${directory}}`)
    mkdirSync(directory, {recursive: true})
  }
  if (!existsSync(filepath)) {
    console.log(chalk`{dim Creating file ${filepath}}`)
    writeFileSync(filepath, defaultContent)
  }
  return readFileSync(filepath).toString()
}

function listDirOrCreate(dirpath: string): Array<string> {
  dirpath = expandHomeDir(dirpath)
  if (!existsSync(dirpath)) {
    console.log(chalk`{dim Creating directory ${dirpath}}`)
    mkdirSync(dirpath, {recursive: true})
  }
  return readdirSync(dirpath)
}

function appendOrCreate(filepath: string, append: string): void {
  filepath = expandHomeDir(filepath)
  let content = readOrCreate(filepath)
  content += append
  writeFileSync(filepath, content)
}

function writeOrCreate(filepath: string, newContent: string): void {
  filepath = expandHomeDir(filepath)
  filepath = resolve(filepath)
  console.log(chalk`{dim Writing to ${filepath}}`)
  let content = readOrCreate(filepath)
  content = newContent
  writeFileSync(filepath, content)
}

async function openFileOrURI(fileOrURI: string): Promise<void> {
  if (isWsl) {
    const editor = process.env.EDITOR || 'code'
    console.log(chalk`{dim Opening ${fileOrURI} with ${editor}...}`)
    await execa(editor, [fileOrURI])
  } else {
    await open(fileOrURI)
  }
}

function createAndMove(oldPath: string, newPath: string): void {
  oldPath = resolve(expandHomeDir(oldPath))
  newPath = resolve(expandHomeDir(newPath))
  console.log(chalk`{dim Moving ${oldPath} to ${newPath}}`)
  if (!existsSync(dirname(newPath))) {
    mkdirSync(dirname(newPath), {recursive: true})
  }
  renameSync(oldPath, newPath)
}

function listDir(dirpath: string): string[] {
  dirpath = resolve(expandHomeDir(dirpath))
  console.log(chalk`{dim Listing files under ${dirpath}}`)
  return readdirSync(dirpath)
}

export { appendOrCreate, listDirOrCreate, readOrCreate, writeOrCreate, openFileOrURI, createAndMove, listDir }
