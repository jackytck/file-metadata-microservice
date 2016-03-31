require('babel-polyfill')
require('babel-register')
if (!process.env.HEROKU) {
  require('dotenv').load()
}
require('./server')
