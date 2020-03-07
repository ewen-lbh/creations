/**
 * class Template
 * Proved with:
 * - the template's location
 * Stores:
 * - the path where the structure should be generated
 * - an object containing the directory
 * - an object containing the directory, with mustaches replaces
 * - a method to generate the template
 */
import { readFileSync } from 'fs'
import { writeOrCreate } from './io'
const directoryTree = require('directory-tree')
const Mustache = require('mustache')

interface DirectoryTree {
  name: string;
  path: string;
  children: DirectoryTree[];
  type: "directory" | "file";
}

class Template {
  location: string

  substitutions: Record<string, string | number>

  constructor(location: string, substitutions: Record<string, string | number>) {
    this.location = location
    this.substitutions = substitutions
  }

  generate(): void {
    this._generateOne(this.structure)
  }

  _generateOne(tree: DirectoryTree): void {
    if (tree.type === 'directory') {
      for (const child of tree.children) {
        this._generateOne(child)
      }
    } else {
      const contents = readFileSync(tree.path).toString()
      const rendered = Mustache.render(contents, this.substitutions)
      writeOrCreate(tree.path, rendered)
    }
  }

  get rawStructure() {
    return directoryTree(this.location)
  }

  get structure() {
    return this._substituteInTree(this.rawStructure)
  }

  _substituteInTree(tree: DirectoryTree): DirectoryTree {
    return {
      ...tree,
      name: this._substitute(tree.name),
      path: this._substitute(tree.path),
      children: tree.children.map(child => this._substituteInTree(child)),
    }
  }

  _substitute(value: string): string {
    return Mustache.render(value, this.substitutions)
  }
}

/**
 * class TemplatesManager
 * Provided with:
 * - templates directory
 * Stores:
 * - templates locations
 * - getter: template
 */
class TemplatesManager {
  location: string

  constructor(location: string) {
    this.location = location
  }

  get()
}


export { TemplatesManager, Template }
