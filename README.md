creations
=========

A universal creations manager, to scaffold, publish, version, navigate and manage all of your creations, code-related or not!

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/creations.svg)](https://npmjs.org/package/creations)
[![Downloads/week](https://img.shields.io/npm/dw/creations.svg)](https://npmjs.org/package/creations)
[![License](https://img.shields.io/npm/l/creations.svg)](https://github.com/ewen-lbh/creations/blob/master/package.json)
[![Build Status](https://travis-ci.com/ewen-lbh/creations.svg?branch=master)](https://travis-ci.com/ewen-lbh/creations)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g creations # or, with yarn:
$ yarn global add creations
$ creations COMMAND
running command...
$ creations (-v|--version|version)
creations/0.2.0 linux-x64 node-v13.4.0
$ creations --help [COMMAND]
USAGE
  $ creations COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`creations add THING NAME`](#creations-add-thing-name)
* [`creations config`](#creations-config)
* [`creations goto [CREATION]`](#creations-goto-creation)
* [`creations help [COMMAND]`](#creations-help-command)
* [`creations iteration [VERSION]`](#creations-iteration-version)
* [`creations list [FILE]`](#creations-list-file)
* [`creations new TYPE CREATION`](#creations-new-type-creation)
* [`creations open [FILE]`](#creations-open-file)
* [`creations publish`](#creations-publish)

## `creations add THING NAME`

Add a new THING named NAME to the current creation. "things" need to be added in the creation type's configuration.

```
USAGE
  $ creations add THING NAME

OPTIONS
  -h, --help  show CLI help

EXAMPLES
  $ creations add component ModalAddHomework
  $ creations add resource background.png
```

_See code: [src/commands/add.ts](https://github.com/ewen-lbh/creations/blob/v0.2.0/src/commands/add.ts)_

## `creations config`

Manage creations' configuration

```
USAGE
  $ creations config

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/config.ts](https://github.com/ewen-lbh/creations/blob/v0.2.0/src/commands/config.ts)_

## `creations goto [CREATION]`

Change the current working directory to CREATION's directory

```
USAGE
  $ creations goto [CREATION]

OPTIONS
  -h, --help  show CLI help

EXAMPLE
  $ creations goto schoolsyst
```

_See code: [src/commands/goto.ts](https://github.com/ewen-lbh/creations/blob/v0.2.0/src/commands/goto.ts)_

## `creations help [COMMAND]`

display help for creations

```
USAGE
  $ creations help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.3/src/commands/help.ts)_

## `creations iteration [VERSION]`

Set, increment or get the creation's version

```
USAGE
  $ creations iteration [VERSION]

ARGUMENTS
  VERSION  If version is "major", "minor" or "patch", the current version will be incremented. If not specified, the
           current creation's version is returned

OPTIONS
  -h, --help  show CLI help

EXAMPLES
  $ creations iteration 1.0.0
  $ creations iteration minor
  $ creations iteration
  v2.0.3
```

_See code: [src/commands/iteration.ts](https://github.com/ewen-lbh/creations/blob/v0.2.0/src/commands/iteration.ts)_

## `creations list [FILE]`

List all of your creations

```
USAGE
  $ creations list [FILE]

OPTIONS
  -h, --help    show CLI help
  --paths-only  Only print the creations' paths

EXAMPLE
  $ creations list --paths-only
  D:\#\Coding\projects\schoolsyst
  D:\#\Graphism\static\logos\mx3
  ...
```

_See code: [src/commands/list.ts](https://github.com/ewen-lbh/creations/blob/v0.2.0/src/commands/list.ts)_

## `creations new TYPE CREATION`

Create a new TYPE named CREATION

```
USAGE
  $ creations new TYPE CREATION

OPTIONS
  -h, --help  show CLI help

EXAMPLES
  $ creations new restapi schoolsyst
  $ creations new logo mx3
```

_See code: [src/commands/new.ts](https://github.com/ewen-lbh/creations/blob/v0.2.0/src/commands/new.ts)_

## `creations open [FILE]`

Opens CREATION. The difference with `goto` is that this will also open the project in the configured software (eg. open the .psd in Photoshop)

```
USAGE
  $ creations open [FILE]

OPTIONS
  -h, --help  show CLI help
  --no-goto   Don't  run `goto CREATION`
```

_See code: [src/commands/open.ts](https://github.com/ewen-lbh/creations/blob/v0.2.0/src/commands/open.ts)_

## `creations publish`

Publish your creation

```
USAGE
  $ creations publish

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/publish.ts](https://github.com/ewen-lbh/creations/blob/v0.2.0/src/commands/publish.ts)_
<!-- commandsstop -->
