'use strict'

const CodeCommitEvent = require('./lib/codecommit-event')
const BuildService = require('./lib/build-service')

module.exports.launchBuild = (event, context) => {
  var codeCommitEvent = new CodeCommitEvent(event)

  return new BuildService().startBuildsFrom(codeCommitEvent)
  .then(context.succeed)
  .catch(context.fail)
}
