'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')
const authEvents = require('./auth/events')

$(() => {
  authEvents.authHandlers()
  setAPIOrigin(location, config)
})
