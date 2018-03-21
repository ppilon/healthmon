/**
 *  @fileOverview Manages the interface for Authentication
 *
 *  @author       Phil Pilon
 *  @requires     /lib/notifications.js
 *  @requires     /assets/scripts/store.js
 */

 /**  @module Authentication */

const Notification = require('../../../lib/notifications')
const store = require('../store')

/**
* UI for Sign in Success
* @function
* @name onSignInSuccess
* @param {object} data - user object returned from ajax request
*/
const onSignInSuccess = function (data) {
  // Login Successfully Notification
  new Notification('success', 'Login Successful')
  // Get signin form
  const form = document.getElementsByName('form-signin')[0]
  // Clears form fields
  form.reset()
  toggleAuthView()
  $('.name').text(data.user.email)
  store.user = data.user
  // Stores the users info in sessionStorage
  sessionStorage.setItem('user', JSON.stringify(store.user))
}

/**
* UI for Logout Success
* @function
* @name onLogoutSuccess
*/
const onLogoutSuccess = function () {
  // Logout Successfully Notification
  new Notification('success', 'Logout Successful')
  toggleAuthView()
  sessionStorage.removeItem('user')
}

/**
* UI for Logout Error
* @function
* @name onLogoutError
*/
const onLogoutError = function () {
}

/**
* UI for Signin Error
* @function
* @name onSignInError
* @param {object} error - error returned from ajax request
*/
const onSignInError = function (error) {
  new Notification('danger', error.statusText)
  $('#signin-email').val('')
  $('#signin-password').val('')
}

/**
* UI for Signin Success
* @function
* @name onSignInSuccess
* @param {object} data - user object returned from ajax request
*/
const onSignUpSuccess = function (data) {
  // Shows Signin Form
  $('.form-signin').show()
  // Hides Signup Form
  $('.form-signup').hide()
  const form = document.getElementsByName('form-signup')[0]
  form.reset()
  new Notification('success', 'Signup Successful')
}

/**
* UI for Signup Errors
* @function
* @name onSignUpError
* @param {object} error - error returned from ajax request
*/
const onSignUpError = function (error) {
  new Notification('danger', error.statusText)
}

/**
* Shows Authentication View or Logged in View
* @function
* @name toggleAuthView
*/
const toggleAuthView = function () {
  $('.auth-view').toggle()
  $('.logged-in-view').toggle()
}

module.exports = {
  onSignInSuccess,
  onSignInError,
  onSignUpError,
  onSignUpSuccess,
  onLogoutSuccess,
  onLogoutError,
  toggleAuthView
}
