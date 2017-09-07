const {deepEqual} = require('assert')
const CodeCommitEvent = require('../lib/codecommit-event')

test('returns empty array when event is null', function () {
  var codeCommitEvent = new CodeCommitEvent()
  deepEqual(codeCommitEvent.getBranches(), [])
})

test('returns empty array with an empty commit event', function () {
  var codeCommitEvent = new CodeCommitEvent(emptyCommitEvent())
  deepEqual(codeCommitEvent.getBranches(), [])
})

test('returns one branch with a single commit event', function () {
  var codeCommitEvent = new CodeCommitEvent(singleCommitEvent())
  deepEqual(codeCommitEvent.getBranches(), ['master'])
})

test('returns many branches with a multiple commit event', function () {
  var codeCommitEvent = new CodeCommitEvent(multipleCommitEvent())
  deepEqual(codeCommitEvent.getBranches(), ['master', 'aBranch', 'anotherBranch'])
})

function singleCommitEvent () {
  return {
    Records: [
      {
        codecommit: {
          references: [
            {
              commit: '00000000-0000-0000-0000-000000000000',
              ref: 'refs/heads/master'
            }
          ]
        }
      }
    ]
  }
}

function multipleCommitEvent () {
  return {
    Records: [
      {
        codecommit: {
          references: [
            {
              commit: '00000000-0000-0000-0000-000000000000',
              ref: 'refs/heads/master'
            }, {
              commit: '00000000-0000-0000-0000-000000000000',
              ref: 'refs/heads/aBranch'
            }, {
              commit: '00000000-0000-0000-0000-000000000000',
              ref: 'refs/heads/anotherBranch'
            }
          ]
        }
      }
    ]
  }
}

function emptyCommitEvent () {
  return {
    Records: [
      {
        codecommit: {
        }
      }
    ]
  }
}
