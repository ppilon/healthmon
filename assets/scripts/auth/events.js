/**
 *  @fileOverview Manages the events for Authentication
 *
 *  @author       Phil Pilon
 *  @requires     /lib/get-form-fields.js
 *  @requires     /assets/scripts/auth/api.js
 *  @requires     /assets/scripts/auth/ui.js
 */

/**  @module Authentication */

 const getFormFields = require('../../../lib/get-form-fields')
 const api = require('./api')
 const ui = require('./ui')

/**
* Authentication Event Handlers
* @function
* @name authHandlers
*/
const authHandlers = function () {
  $('.form-signin').on('submit', onSignIn)
  $('.form-signup').on('submit', onSignUp)
  $('.toggle-signup-view, .toggle-login-view').on('click', ui.toggleAuthView)
  $('.logout').on('click', onLogout)
}

/**
* Ajax Request to Log Out a User
* @function
* @name onLogout
* @param {object} event - The click event
*/
const onLogout = function (event) {
  // Prevents Form from submitting
  event.preventDefault()
  // Calls the API making an ajax request to the logout route passing either
  // an error or data to the ui
  api.logout()
    .then(ui.onLogoutSuccess)
    .catch(ui.onLogoutError)
}

/**
* Ajax Request to Sign Up a User
* @function
* @name onSignup
* @param {object} event - The click event
*/
const onSignUp = function (event) {
  // Prevents Form from submitting
  event.preventDefault()
  // Creates Object of the form fields
  const data = getFormFields(event.target)
  // Calls the API making an ajax request to the signup route passing either
  // an error or data to the ui
  api.signUp(data)
    .then(ui.onSignUpSuccess)
    .catch(ui.onSignUpError)
}

/**
* Ajax Request to Sign In a User
* @function
* @name onSignIn
* @param {object} event - The click event
*/
const onSignIn = function (event) {
  // Prevents Form from submitting
  event.preventDefault()
  // Creates Object of the form fields
  const data = getFormFields(event.target)
  // Calls the API making an ajax request to the signin route passing either
  // an error or data to the ui
  api.signIn(data)
    .then(ui.onSignInSuccess)
    .catch(ui.onSignInError)
}

module.exports = {
  authHandlers
}
