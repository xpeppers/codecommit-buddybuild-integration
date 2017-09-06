const {deepEqual} = require('assert')
const BuildService = require('../lib/build-service')

test('test BuildService send a build HTTP request', function () {
  var buddybuild = spyBuddyBuild()
  var codeCommitEvent = fakeCodeCommitEvent(['master'])

  var buildService = new BuildService(buddybuild)

  return buildService.startBuildsFrom(codeCommitEvent)
  .then(() => {
    deepEqual(buddybuild.callsCount(), 1)
    deepEqual(buddybuild.calledWith(), 'master')
  })
})

function fakeCodeCommitEvent (branches) {
  return {
    branches: function () {
      return branches
    }
  }
}

function spyBuddyBuild () {
  var calls = []

  return {
    triggerFor: function (branch) {
      calls.push(branch)
    },
    calledWith: function () {
      return calls[calls.length - 1]
    },
    callsCount: function () {
      return calls.length
    }
  }
}
