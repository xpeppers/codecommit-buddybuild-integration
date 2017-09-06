'use strict'

const request = require('request')

class BuddyBuild {
  constructor (appId, accessToken) {
    this.appId = appId
    this.accessToken = accessToken
  }

  triggerFor (branch) {
    return new Promise((resolve, reject) => {
      console.log('triggering branch', branch)
      request({
        headers: {'Authorization': `Bearer ${this.accessToken}`},
        uri: `https://api.buddybuild.com/v1/apps/${this.appId}/build`,
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
