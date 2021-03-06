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
import { readFileSync, readdirSync } from 'fs'
import { writeOrCreate } from './io'
import { join, basename, dirname, relative, resolve } from 'path'
import { snakeCase } from 'change-case'
const consola = require('consola')
const directoryTree = require('directory-tree')
const Mustache = require('mustache')
const toml = require('@iarna/toml')
const chalk = require('chalk')
const sanitizeFilename = require('sanitize-filename')
const expandHomeDir = require('expand-home-dir')

interface DirectoryTree {
  name: string;
  path: string;
  children: DirectoryTree[];
  type: 'directory' | 'file';
}

/**
 * Each template has a `template.toml` file at its root.
 */
interface TemplateConfigCommand {
  in: string;
  after: string[] | undefined;
}
interface TemplateConfig {
  new: TemplateConfigCommand;
  add: Record<string, TemplateConfigCommand>;
}

class Template {
  location: string

  name: string

  substitutions: Record<string, string> = {}

  constructor(location: string) {
    this.location = resolve(expandHomeDir(location))
    this.name = basename(this.location)
  }

  /**
   * Generates a new structure in the correct directory
   * @param {string} whichTemplate What template associated with which command should be generated? (new, add.<thing>, ...)
   * @param {object} substitutions An object of variables to substitute
   * @returns {string} The path to the directory where the structure was generated
   */
  generate(whichTemplate: string, substitutions: Record<string, string>): string {
    this.substitutions = substitutions
    const outputPath = this.outputPath(whichTemplate)
    const rawStructure = this.getRawStructure(whichTemplate)
    this._renderAndCreate(rawStructure, outputPath, whichTemplate)
    return outputPath
  }

  /**
   * Renders the file and creates it, or recurses if `tree` represents a directory
   * @param {DirectoryTree} tree The directory object to iterate through
   * @param {string} outputDir The output directory
   * @param {string} whichTemplate Which template is being generated (either "new" or "add.<thing>")
   */
  _renderAndCreate(tree: DirectoryTree, outputDir: string, whichTemplate: string): void {
    // TODO: handle empty directories
    if (tree.type === 'directory') {
      for (const child of tree.children) {
        this._renderAndCreate(child, outputDir, whichTemplate)
      }
    } else {
      const outFilePath = tree.path.replace(join(this.location, whichTemplate), outputDir)
      const contents = readFileSync(tree.path).toString()
      const rendered = Mustache.render(contents, this.substitutions)
      writeOrCreate(outFilePath, rendered)
      consola.success(chalk`Rendered file {cyan @/${relative(this.location, tree.path)}} to {blue ${outFilePath}}`)
    }
  }

  /**
   * Gets the output path for the specified template
   * @param {string} whichTemplate Which template to choose? "new" or "add.<thing>" ?
   * @returns {string} The output path
   */
  outputPath(whichTemplate: string): string {
    let commandTemplateConfig: TemplateConfigCommand
    if (whichTemplate === 'new') {
      commandTemplateConfig = this.templateConfig.new
    } else if (whichTemplate === 'add') {
      // Get the thing: add.<thing>
      const thing = whichTemplate.split('.')[1]
      commandTemplateConfig = this.templateConfig.add[thing]
    } else {
      throw new Error(chalk`{red Cannot get template for unknown command {white.bold ${whichTemplate}}.}`)
    }
    if (commandTemplateConfig.in === undefined) {
      throw new Error(chalk`{red Please add a {white.bold in} key to your configuration's {white.bold [${whichTemplate}]} section.}`)
    }
    let path = commandTemplateConfig.in
    path = this._substitute(path)
    return path
  }

  /**
   * Get an object representing the template's directory structure.
   * 'raw' as in no substitutions are made — use `getStructure` to get a "treated" structure.
   * @param {string} whichTemplate - For what command do we want the structure? new? add <thing>? Use 'new' for new and 'add.<thing>' for things
   * @returns {DirectoryTree} The structure
   */
  getRawStructure(whichTemplate: string): DirectoryTree {
    if (whichTemplate.startsWith('add.')) {
      whichTemplate = join(...whichTemplate.split('.'))
    }
    const templateDir = join(this.location, whichTemplate)
    console.log(chalk`{dim Got raw structure for ${templateDir}}`)
    return directoryTree(templateDir)
  }

  /**
   * Get an object representing the template's directory structure after subtitutions occured.
   * @param {string} whichTemplate - For what command do we want the structure? new? add <thing>? Use 'new' for new and 'add.<thing>' for things
   * @returns {DirectoryTree} The structure
   */
  getStructure(whichTemplate: string): DirectoryTree {
    return this._substituteInTree(this.getRawStructure(whichTemplate))
  }

  _substituteInTree(tree: DirectoryTree): DirectoryTree {
    const substitutedName = this._substitute(tree.name, { filename: true })
    return {
      ...tree,
      name: substitutedName,
      path: join(dirname(tree.name), substitutedName),
      children: tree.children.map(child => this._substituteInTree(child)),
    }
  }

  /**
   * Substitute variables using {{mustache}} notation from a value
   *
   * TODO: use https://mozilla.github.io/nunjucks/ instead of Mustache
   * @param {string} value The value to apply substitutions to
   * @param {boolean} filename If true, sanitizes the value after substitution for use in filenames
   * @returns {string} The final value
   */
  _substitute(value: string, {filename} = {filename: false}): string {
    // To replace @/ with the project's path
    value = value.replace(/@\//g, '{{ projectDir }}/')
    const substitutions = this.additionalSubstitutions
    let rendered = Mustache.render(value, substitutions)
    if (filename) {
      rendered = sanitizeFilename(value)
    }
    return rendered
  }

  /**
   * Adds filtered substitutions to the substitutions object.
   * eg. add "name~slashes2dots".
   * Also adds 'ob' and 'cb'
   */
  get additionalSubstitutions() {
    return {
      ...this.substitutions,
      'name~slashes2dots': this.substitutions?.name.split('/').join('.'),
      'name~snake': snakeCase(this.substitutions?.name),
      ob: '{{',
      cb: '}}',
    }
  }

  get templateConfig(): TemplateConfig {
    const configPath = join(this.location, 'template.toml')
    const rawContents = readFileSync(configPath)
    const parsed = toml.parse(rawContents)
    return parsed
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

  /**
   * Getter for templates
   * @returns {Template[]} An array of templates
   */
  get templates(): Template[] {
    const templates = []
    // Read the directory
    const names = readdirSync(this.location, { withFileTypes: true })
    // For each entry
    for (const name of names) {
      // Templates are directories
      if (!name.isDirectory()) continue
      // Get the full path
      const fullPath = join(this.location, name.name)
      templates.push(new Template(fullPath))
    }
    return templates
  }

  /**
   * Gets a Template using the creation type
   * @param {string} type - The creation type to search with
   * @returns {Template|undefined} The template found, or `undefined` when not found.
   */
  byType(type: string): Template|undefined {
    // Convert to dotted paths
    type = type.replace(/\//g, '.')
    // Find the template
    return this.templates.find(template => template.name === type)
  }
}

export { TemplatesManager, Template}
