'use strict'

const request = require('request')

module.exports.launchBuild = (event, context) => {
  request({
    headers: {'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`},
    uri: `https://api.buddybuild.com/v1/apps/${process.env.APP_ID}/build`,
    data: {branch: 'master'},
    method: 'POST'
  }, function (err, res, body) {
    if (err) {
      console.log('response_error: ', err)
      context.fail(err)
    }
    console.log(body)
    context.succeed(body)
  })
}
