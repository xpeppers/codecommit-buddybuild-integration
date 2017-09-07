const BuddyBuild = require('./buddybuild')

class BuildService {
  constructor (buddybuild) {
    this.buddyBuild = buddybuild || new BuddyBuild(process.env.APP_ID, process.env.ACCESS_TOKEN)
  }

  startBuildsFrom (codeCommitEvent) {
    var branches = codeCommitEvent.getBranches()

    return Promise.all(branches.map((branch) => this.buddyBuild.triggerFor(branch)))
  }
}

module.exports = BuildService
