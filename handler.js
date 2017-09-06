'use strict'

const request = require('request')
const CodeCommitEvent = require('../lib/codecommit-event')

module.exports.launchBuild = (event, context) => {
  var branches = new CodeCommitEvent(event).getBranches()

  return Promise.all(branches.map(launchBuddyBuild))
  .then(() => {
    context.succeed()
  })
  .catch(() => {
    context.fail()
  })
}

function launchBuddyBuild (branch) {
  return new Promise((resolve, reject) => {
    request({
      headers: {'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`},
      uri: `https://api.buddybuild.com/v1/apps/${process.env.APP_ID}/build`,
      data: {branch: branch},
      method: 'POST'
    }, function (err, res, body) {
      if (err) {
        console.log('response_error: ', err)
        resolve(err)
      } else {
        console.log(body)
        resolve(body)
      }
    })
  })
}
