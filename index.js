// const _       = require('lodash')
const request = require('request')

const getUrl = (username) => `http://instagram.com/${username}/media`

const init () => {
  const argv = require('yargs')
    .option('u', {
      alias: ['username', 'userid'],
      demand: true,
      describe: 'instagram username',
      type: 'string'
    }).argv
  const {username} = argv

  if (username && username.length > 2) {
    console.log(`Looking up data for: ${username}`)
    instascrape(username)
    .then(data => {
      // here's where we output the data to console/stdout
      console.log(data)
    })
  } else {
    return console.warn(`Error: Cannot run without --username parameter!`)
  }

}


const instascrape = (username) => {
  return new Promise((reject, resolve) => {
    request({
      uri: getUrl(username),
      method: 'GET',
      json: true
    }, (error, request, body) => {
      if (error) { return reject(error) }
      if (body && body.status === 'ok') {
        return resolve(body.items)
      }
      return reject(new Error(`Invalid Status in Response: ${body && body.status}`))
    })
  })
}


init()

