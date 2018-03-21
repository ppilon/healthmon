'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')
const store = require('./store')
const userEvents = require('./user/events')
const authEvents = require('./auth/events')
const snapshotEvents = require('./health_snapshots/events')
const Handlebars = require('handlebars');

$(() => {
  Handlebars.registerPartial('navbar', 'templates/navbar.handlebars')
  // Determines whether to use development server or production
  setAPIOrigin(location, config)

  // Handlers
  authEvents.authHandlers()
  userEvents.userHandlers()
  snapshotEvents.snapshotHandlers()

  // Displays authentication window if user is not logged in
  if (store.user.token != null) {
    showLoggedInView()
  }

  // Minimizes Sidebar
  $('body').on('click', '.toggle-sidebar', toggleSidebar)
})


const toggleSidebar = function () {
  $('.sidebar').toggleClass('sidebar-show')
  $('.main').toggleClass('main-small')
}

// Hides Login View and Shows Logged in View
const showLoggedInView = function () {
  $('.auth-view').toggle()
  $('.logged-in-view').toggle()
}
