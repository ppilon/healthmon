/**
 *  @fileOverview Manages the api calls for authentication
 *
 *  @author       Phil Pilon
 *  @requires     /assets/scripts/config.js
 *  @requires     /assets/scripts/store.js
 */

/**  @module Authentication */

 const config = require('../config')
 const store = require('../store')

 const contentType = 'application/json'

/**
* Ajax Request to log a User in
* @function
* @name signIn
* @param {object} data - The users credentials from the login form
* @return {object} Returns the ajax request
*/
const signIn = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/sign-in',
    method: 'POST',
    data,
    headers: {
      contentType: contentType
    }
  })
}

/**
* Ajax Request to log out a User
* @function
* @name logout
* @return {object} Returns the ajax request
*/
const logout = function () {
  return $.ajax({
    url: config.apiOrigin + '/sign-out/',
    method: 'DELETE',
    headers: {
      contentType: contentType,
      Authorization: 'Token token=' + store.user.token
    }
  })
}

/**
* Ajax Request to Sign Up a User
* @function
* @name signUp
* @param {object} data - The signup form data
* @return {object} Returns the ajax request
*/
const signUp = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/sign-up',
    method: 'POST',
    data,
    headers: {
      contentType: contentType
    }
  })
}

module.exports = {
  signIn,
  signUp,
  logout
}
