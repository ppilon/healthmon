'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')
const store = require('./store')
const userEvents = require('./user/events')
const authEvents = require('./auth/events')
const snapshotEvents = require('./health_snapshots/events')

$(() => {
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

  const previews = "<div class='row'><div class='col-md-2 dz-filename'><span data-dz-name></span></div><div class='col-md-2 dz-size' data-dz-size></div><div class='col-md-2'><div class='progress'><div class='progress-bar progress-bar-striped active dz-upload' data-dz-uploadprogress role='progressbar' aria-valuenow='0' aria-valuemin='0' aria-valuemax='100' style='width: 0%'></div></div></div><div class='col-md-3 status'></div><div class='col-md-3 file-type'></div></div>"

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
