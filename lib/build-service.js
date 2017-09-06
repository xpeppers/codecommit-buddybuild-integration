const BuddyBuild = require('./buddybuild')

class BuildService {
  constructor (buddybuild = new BuddyBuild()) {
    this.buddyBuild = buddybuild
  }

  startBuildsFrom (codeCommitEvent) {
    var branches = codeCommitEvent.branches()

    return Promise.all(branches.map((branch) => this.buddyBuild.triggerFor(branch)))
  }
}

module.exports = BuildService
