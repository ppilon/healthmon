'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')
const authEvents = require('./auth/events')
const store = require('./store')
const userEvents = require('./user/events')

$(() => {
  authEvents.authHandlers()
  userEvents.userHandlers()
  setAPIOrigin(location, config)
  $('body').on('click', '.toggle-sidebar', function () {
    $('.sidebar').toggleClass('sidebar-show')
    $('.main').toggleClass('main-small')
  })
  $('body').on('click', '.toggle-update-info', function (event) {
    event.preventDefault()
    $('.change-password-form').hide()
    $('.user-update-form').show()
  })
  $('body').on('click', '.toggle-change-pw', function (event) {
    event.preventDefault()
    $('.user-update-form').hide()
    $('.change-password-form').show()
  })
  $('body').on('click', '.toggle-destroy-account', function (event) {
    event.preventDefault()
  })
  if (store.user.token != null) {
    $('.auth-view').toggle()
    $('.logged-in-view').toggle()
  }
})
