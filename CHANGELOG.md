# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.5.0] - 2020-03-23
### Added

- Command `unregister`
- Command `scan`
- Command `delete`
- Option `--format` for `list`

### Changed

- `list`: Option `--paths-only` was replaced by `--format=paths-only`
- `register`: `NAME` defaults to the *basename* of `DIRECTORY`, not the entire directory

### Fixed

- Fix `new` folder containing the entire generated template generated instead of just its contents (see 979d5bb94f2de5a0eb9e9c5ed680f34b1b2f55cf)

- `move`: Fix moving of creations with slashes in the name (see 979d5bb94f2de5a0eb9e9c5ed680f34b1b2f55cf)
