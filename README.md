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
creations/0.5.0 linux-x64 node-v13.11.0
$ creations --help [COMMAND]
USAGE
  $ creations COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`creations add THING NAME`](#creations-add-thing-name)
* [`creations archive [NAME]`](#creations-archive-name)
* [`creations config`](#creations-config)
* [`creations debug`](#creations-debug)
* [`creations delete [NAME]`](#creations-delete-name)
* [`creations goto [CREATION]`](#creations-goto-creation)
* [`creations help [COMMAND]`](#creations-help-command)
* [`creations idea [PROJECT] IDEA`](#creations-idea-project-idea)
* [`creations iteration [VERSION]`](#creations-iteration-version)
* [`creations list`](#creations-list)
* [`creations move [NAME] [NEW-DIRECTORY]`](#creations-move-name-new-directory)
* [`creations new TYPE NAME`](#creations-new-type-name)
* [`creations open [NAME]`](#creations-open-name)
* [`creations publish`](#creations-publish)
* [`creations regen-records`](#creations-regen-records)
* [`creations register DIRECTORY TYPE [NAME]`](#creations-register-directory-type-name)
* [`creations rename [NAME] [NEW-NAME]`](#creations-rename-name-new-name)
* [`creations scan [DIRECTORY]`](#creations-scan-directory)
* [`creations unarchive [NAME]`](#creations-unarchive-name)
* [`creations unregister [NAME]`](#creations-unregister-name)

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

_See code: [src/commands/add.ts](https://github.com/ewen-lbh/creations/blob/v0.5.0/src/commands/add.ts)_

## `creations archive [NAME]`

Archive a creation

```
USAGE
  $ creations archive [NAME]

OPTIONS
  -c, --creation=CREATION-ID  Use this creation instead of the current. Only has effect on commands relying on the
                              current creation.

  -h, --help                  show CLI help

  -v, --debug
```

_See code: [src/commands/archive.ts](https://github.com/ewen-lbh/creations/blob/v0.5.0/src/commands/archive.ts)_

## `creations config`

Manage creations' configuration

```
USAGE
  $ creations config

OPTIONS
  -c, --creation=CREATION-ID  Use this creation instead of the current. Only has effect on commands relying on the
                              current creation.

  -h, --help                  show CLI help

  -v, --debug
```

_See code: [src/commands/config.ts](https://github.com/ewen-lbh/creations/blob/v0.5.0/src/commands/config.ts)_

## `creations debug`

```
USAGE
  $ creations debug

OPTIONS
  -c, --creation=CREATION-ID  Use this creation instead of the current. Only has effect on commands relying on the
                              current creation.

  -h, --help                  show CLI help

  -v, --debug
```

_See code: [src/commands/debug.ts](https://github.com/ewen-lbh/creations/blob/v0.5.0/src/commands/debug.ts)_

## `creations delete [NAME]`

Deletes a creations from the records AND delete the folder.

```
USAGE
  $ creations delete [NAME]

OPTIONS
  -c, --creation=CREATION-ID  Use this creation instead of the current. Only has effect on commands relying on the
                              current creation.

  -h, --help                  show CLI help

  -v, --debug

  -y, --yes                   Do not ask for confirmation.
```

_See code: [src/commands/delete.ts](https://github.com/ewen-lbh/creations/blob/v0.5.0/src/commands/delete.ts)_

## `creations goto [CREATION]`

Change the current working directory to CREATION's directory

```
USAGE
  $ creations goto [CREATION]

OPTIONS
  -c, --creation=CREATION-ID  Use this creation instead of the current. Only has effect on commands relying on the
                              current creation.

  -h, --help                  show CLI help

  -v, --debug

EXAMPLE
  $ creations goto schoolsyst
```

_See code: [src/commands/goto.ts](https://github.com/ewen-lbh/creations/blob/v0.5.0/src/commands/goto.ts)_

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

_See code: [src/commands/idea.ts](https://github.com/ewen-lbh/creations/blob/v0.5.0/src/commands/idea.ts)_

## `creations iteration [VERSION]`

Set, increment or get the creation's version

```
USAGE
  $ creations iteration [VERSION]

ARGUMENTS
  VERSION  If version is "major", "minor" or "patch", the current version will be incremented. If not specified, the
           current creation's version is returned

OPTIONS
  -c, --creation=CREATION-ID  Use this creation instead of the current. Only has effect on commands relying on the
                              current creation.

  -h, --help                  show CLI help

  -v, --debug

EXAMPLES
  $ creations iteration 1.0.0
  $ creations iteration minor
  $ creations iteration
  v2.0.3
```

_See code: [src/commands/iteration.ts](https://github.com/ewen-lbh/creations/blob/v0.5.0/src/commands/iteration.ts)_

## `creations list`

List all of your creations

```
USAGE
  $ creations list

OPTIONS
  -a, --show-archived                      Show archived creations

  -c, --creation=CREATION-ID               Use this creation instead of the current. Only has effect on commands relying
                                           on the current creation.

  -f, --format=table|sentences|paths-only  [default: sentences] How to format the list

  -h, --help                               show CLI help

  -s, --sort=type|id|directory|archived    Sort by category, id, directory or archived status.

  -v, --debug

  --no-emojis                              Uses letters for archived status in place of emojis.

  --open                                   Opens the records file

  --show-templates                         Show templates

EXAMPLE
  $ creations list --format paths-only
  /mnt/d/projects/creations
  /mnt/d/Coding/projects/mx3creations
  $ creations list --format table --show-archived
  S  │ Name      │ Type      │ Location                     
     │ creations │ cli/oclif │ /mnt/d/projects/creations          
     │ portfolio │ nuxt/site │ /mnt/d/Coding/projects/mx3creations
  📦 │ aven      │ website   │ /mnt/d/projects/aven
```

_See code: [src/commands/list.ts](https://github.com/ewen-lbh/creations/blob/v0.5.0/src/commands/list.ts)_

## `creations move [NAME] [NEW-DIRECTORY]`

Move a project to a different directory.

```
USAGE
  $ creations move [NAME] [NEW-DIRECTORY]

OPTIONS
  -c, --creation=CREATION-ID  Use this creation instead of the current. Only has effect on commands relying on the
                              current creation.

  -f, --force                 Overwrite existing target directory.

  -h, --help                  show CLI help

  -v, --debug

EXAMPLE
  $ creations list -f paths-only
  /mnt/d/projects/Coding/portfolio
  $ creations move portfolio /mnt/d/projects/
  $ creations list -f paths-only
  /mnt/d/projects/portfolio
```

_See code: [src/commands/move.ts](https://github.com/ewen-lbh/creations/blob/v0.5.0/src/commands/move.ts)_

## `creations new TYPE NAME`

Create a new TYPE named CREATION

```
USAGE
  $ creations new TYPE NAME

OPTIONS
  -O, --no-open               Don't run creations open after creating the creation

  -c, --creation=CREATION-ID  Use this creation instead of the current. Only has effect on commands relying on the
                              current creation.

  -h, --help                  show CLI help

  -v, --debug

  --archive                   Archive existing projects in case the project name is already taken

  --force                     Overwrite existing projects in case the project name is already taken

  --in=DIRECTORY              Generate the template in the specified directory. Uses the type's new.in config as a
                              default.

EXAMPLES
  $ creations new restapi schoolsyst
  $ creations new logo mx3
```

_See code: [src/commands/new.ts](https://github.com/ewen-lbh/creations/blob/v0.5.0/src/commands/new.ts)_

## `creations open [NAME]`

Opens CREATION. The difference with `goto` is that this will also open the project in the configured software (eg. open the .psd in Photoshop)

```
USAGE
  $ creations open [NAME]

OPTIONS
  -c, --creation=CREATION-ID  Use this creation instead of the current. Only has effect on commands relying on the
                              current creation.

  -h, --help                  show CLI help

  -v, --debug

  --no-goto                   Don't  run `goto CREATION`
```

_See code: [src/commands/open.ts](https://github.com/ewen-lbh/creations/blob/v0.5.0/src/commands/open.ts)_

## `creations publish`

Publish your creation

```
USAGE
  $ creations publish

OPTIONS
  -c, --creation=CREATION-ID  Use this creation instead of the current. Only has effect on commands relying on the
                              current creation.

  -h, --help                  show CLI help

  -v, --debug
```

_See code: [src/commands/publish.ts](https://github.com/ewen-lbh/creations/blob/v0.5.0/src/commands/publish.ts)_

## `creations regen-records`

Regenerates the record, removing projects that no longer exist on disk.

```
USAGE
  $ creations regen-records

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/regen-records.ts](https://github.com/ewen-lbh/creations/blob/v0.5.0/src/commands/regen-records.ts)_

## `creations register DIRECTORY TYPE [NAME]`

Add an existing project directory to

```
USAGE
  $ creations register DIRECTORY TYPE [NAME]

ARGUMENTS
  DIRECTORY  The directory to register
  TYPE       What is this project?
  NAME       Choose the name. Defaults to DIRECTORY's basename.

OPTIONS
  -c, --creation=CREATION-ID  Use this creation instead of the current. Only has effect on commands relying on the
                              current creation.

  -f, --force                 Overwrite conflicting creation.

  -h, --help                  show CLI help

  -v, --debug
```

_See code: [src/commands/register.ts](https://github.com/ewen-lbh/creations/blob/v0.5.0/src/commands/register.ts)_

## `creations rename [NAME] [NEW-NAME]`

Rename a creation (and move it to its new directory)

```
USAGE
  $ creations rename [NAME] [NEW-NAME]

OPTIONS
  -c, --creation=CREATION-ID  Use this creation instead of the current. Only has effect on commands relying on the
                              current creation.

  -h, --help                  show CLI help

  -i, --id-only               Do not change the directory, only the ID.

  -v, --debug
```

_See code: [src/commands/rename.ts](https://github.com/ewen-lbh/creations/blob/v0.5.0/src/commands/rename.ts)_

## `creations scan [DIRECTORY]`

Scans through an entire directory and interactively add all creations.

```
USAGE
  $ creations scan [DIRECTORY]

OPTIONS
  -c, --creation=CREATION-ID  Use this creation instead of the current. Only has effect on commands relying on the
                              current creation.

  -h, --help                  show CLI help

  -v, --debug
```

_See code: [src/commands/scan.ts](https://github.com/ewen-lbh/creations/blob/v0.5.0/src/commands/scan.ts)_

## `creations unarchive [NAME]`

Unarchive a project

```
USAGE
  $ creations unarchive [NAME]

OPTIONS
  -c, --creation=CREATION-ID  Use this creation instead of the current. Only has effect on commands relying on the
                              current creation.

  -h, --help                  show CLI help

  -v, --debug
```

_See code: [src/commands/unarchive.ts](https://github.com/ewen-lbh/creations/blob/v0.5.0/src/commands/unarchive.ts)_

## `creations unregister [NAME]`

Removes a creation from the record, but does not delete its directory.

```
USAGE
  $ creations unregister [NAME]

OPTIONS
  -c, --creation=CREATION-ID  Use this creation instead of the current. Only has effect on commands relying on the
                              current creation.

  -h, --help                  show CLI help

  -v, --debug
```

_See code: [src/commands/unregister.ts](https://github.com/ewen-lbh/creations/blob/v0.5.0/src/commands/unregister.ts)_
<!-- commandsstop -->

# Changelog

See [CHANGELOG.md](../blob/master/CHANGELOG.md "This project adheres to the keepachangelog standard")
