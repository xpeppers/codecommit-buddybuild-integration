'use strict'

const CodeCommitEvent = require('./lib/codecommit-event')
const BuddyBuild = require('./lib/buddybuild')

module.exports.launchBuild = (event, context) => {
  var branches = new CodeCommitEvent(event).branches()
  var buddyBuild = new BuddyBuild()

  return Promise.all(branches.map((branch) => buddyBuild.triggerFor(branch)))
  .then(context.succeed)
  .catch(context.fail)
}
