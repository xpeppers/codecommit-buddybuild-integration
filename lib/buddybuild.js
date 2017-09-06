'use strict'

const request = require('request')

class BuddyBuild {
  triggerFor (branch) {
    return new Promise((resolve, reject) => {
      console.log('triggering branch', branch)
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
          console.log('response:', body)
          resolve(body)
        }
      })
    })
  }
}

module.exports = BuddyBuild
