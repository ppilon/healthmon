'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')
const authEvents = require('./auth/events')
const store = require('./store')

$(() => {
  authEvents.authHandlers()
  setAPIOrigin(location, config)
  $('.toggle-sidebar').on('click', function () {
    $('.sidebar').toggleClass('sidebar-show')
  })
  if (store.user.token != null) {
    $('.auth-view').toggle()
    $('.logged-in-view').toggle()
  }
})
