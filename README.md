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
$ npm install -g creations
$ creations COMMAND
running command...
$ creations (-v|--version|version)
creations/0.2.0 linux-x64 node-v13.8.0
$ creations --help [COMMAND]
USAGE
  $ creations COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`creations add THING NAME`](#creations-add-thing-name)
* [`creations archive [FILE]`](#creations-archive-file)
* [`creations config`](#creations-config)
* [`creations debug`](#creations-debug)
* [`creations goto [CREATION]`](#creations-goto-creation)
* [`creations help [COMMAND]`](#creations-help-command)
* [`creations idea [PROJECT] IDEA`](#creations-idea-project-idea)
* [`creations iteration [VERSION]`](#creations-iteration-version)
* [`creations list`](#creations-list)
* [`creations new TYPE NAME`](#creations-new-type-name)
* [`creations open [CREATION]`](#creations-open-creation)
* [`creations publish`](#creations-publish)
* [`creations unarchive [FILE]`](#creations-unarchive-file)

## `creations add THING NAME`

Add a new THING named NAME to the current creation. "things" need to be added in the creation type's configuration.

```
USAGE
  $ creations add THING NAME

OPTIONS
  -c, --creation=creation
  -h, --help               show CLI help
  -v, --debug

EXAMPLES
  $ creations add component ModalAddHomework
  $ creations add resource background.png
```

_See code: [src/commands/add.ts](https://github.com/ewen-lbh/creations/blob/v0.2.0/src/commands/add.ts)_

## `creations archive [FILE]`

describe the command here

```
USAGE
  $ creations archive [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/archive.ts](https://github.com/ewen-lbh/creations/blob/v0.2.0/src/commands/archive.ts)_

## `creations config`

Manage creations' configuration

```
USAGE
  $ creations config

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/config.ts](https://github.com/ewen-lbh/creations/blob/v0.2.0/src/commands/config.ts)_

## `creations debug`

```
USAGE
  $ creations debug

OPTIONS
  -h, --help   show CLI help
  -v, --debug
```

_See code: [src/commands/debug.ts](https://github.com/ewen-lbh/creations/blob/v0.2.0/src/commands/debug.ts)_

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

## `creations idea [PROJECT] IDEA`

Put new ideas for the current project or for PROJECT

```
USAGE
  $ creations idea [PROJECT] IDEA
```

_See code: [src/commands/idea.ts](https://github.com/ewen-lbh/creations/blob/v0.2.0/src/commands/idea.ts)_

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

## `creations list`

List all of your creations

```
USAGE
  $ creations list

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

## `creations new TYPE NAME`

Create a new TYPE named CREATION

```
USAGE
  $ creations new TYPE NAME

OPTIONS
  -h, --help      show CLI help
  -v, --debug
  --in=DIRECTORY  Generate the template in the specified directory. Uses the type's new.in config as a default.

EXAMPLES
  $ creations new restapi schoolsyst
  $ creations new logo mx3
```

_See code: [src/commands/new.ts](https://github.com/ewen-lbh/creations/blob/v0.2.0/src/commands/new.ts)_

## `creations open [CREATION]`

Opens CREATION. The difference with `goto` is that this will also open the project in the configured software (eg. open the .psd in Photoshop)

```
USAGE
  $ creations open [CREATION]

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

## `creations unarchive [FILE]`

describe the command here

```
USAGE
  $ creations unarchive [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/unarchive.ts](https://github.com/ewen-lbh/creations/blob/v0.2.0/src/commands/unarchive.ts)_
<!-- commandsstop -->
