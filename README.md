# Versioner
a light-weight version management system built using node.js

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
