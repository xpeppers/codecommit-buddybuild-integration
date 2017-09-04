'use strict'

const request = require('request')

module.exports.launchBuild = (event, context) => {
  console.log(JSON.stringify(event))
  const APP_ID = 'APP_ID'
  const ACCESS_TOKEN = 'ACCESS_TOKEN'

  request({
    headers: {'Authorization': `Bearer ${ACCESS_TOKEN}`},
    uri: `https://api.buddybuild.com/v1/apps/${APP_ID}/build`,
    method: 'POST'
  }, function (err, res, body) {
    if (err) {
      console.log('response_error: ', err)
    }
    console.log('response: ', JSON.stringify(res))
    console.log('response_body: ', body)
    context.succeed()
  })
}
