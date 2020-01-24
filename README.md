creations
=========

A universal creations manager, to scaffold, publish, version, navigate and manage all of your creations, code-related or not!

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/creations.svg)](https://npmjs.org/package/creations)
[![Downloads/week](https://img.shields.io/npm/dw/creations.svg)](https://npmjs.org/package/creations)
[![License](https://img.shields.io/npm/l/creations.svg)](https://github.com/ewen-lbh/creations/blob/master/package.json)

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
creations/0.1.0 linux-x64 node-v13.4.0
$ creations --help [COMMAND]
USAGE
  $ creations COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`creations hello [FILE]`](#creations-hello-file)
* [`creations help [COMMAND]`](#creations-help-command)

## `creations hello [FILE]`

describe the command here

```
USAGE
  $ creations hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ creations hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/ewen-lbh/creations/blob/v0.1.0/src/commands/hello.ts)_

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
<!-- commandsstop -->
