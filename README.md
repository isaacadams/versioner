# Versioner
a version management system built using node.js

## Usage Information
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fisaacadams%2Fversioner.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fisaacadams%2Fversioner?ref=badge_shield)


Usage: versioner [options] [command]<br><br>Versioner, helping developers manage their versions<br><br>Options:<br>&ensp;&ensp;-V, --version&ensp;&ensp;output the version number<br>&ensp;&ensp;-h, --help&ensp;&ensp;output usage information<br><br>Commands:<br>&ensp;&ensp;init <project>&ensp;&ensp;initialize versioner for your project<br>&ensp;&ensp;get [options]&ensp;&ensp;Get the current version

## to do

- init requires project name and initial version
- on init
  - master will be tagged with initial version
  - release branches will be generated
- on release
  - master will be tagged with new version
  - versioner will always looks to master tags for the current version
- add 'long version' or 'with suffix' options to 'get'

## problems
- none

## plans
 - versioner will be a CLI
 - will be able to
   - bump local build #s
   - create release branches with latest release versions
   - when releasing, will be able to bump version number

### thoughts
- starting a new release
  - does making a new release branch drive the new release version?
  - will versioner have a command that starts a new release and creates a release branch
- is there a way to synchronize jenkins and versioner with build #
- will there be three release branches at at time? One for the next major, minor and patch?
  - versioner could create the three release branches and always have them exist until they release
  - each one will continually integrate into the next one up
  - how do I know that a package has been released?
  - each release branch gets created underneath release/$\{project-name\}/* when the support for mutli project repos is needed


## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fisaacadams%2Fversioner.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fisaacadams%2Fversioner?ref=badge_large)