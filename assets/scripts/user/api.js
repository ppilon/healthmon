/**
 *  @fileOverview Manages the api calls for users
 *
 *  @author       Phil Pilon
 *  @requires     /assets/scripts/config.js
 *  @requires     /assets/scripts/store.js
 */

/** @module Users */

const config = require('../config')
const store = require('../store')

// Ajax Headers
const headers = {
  contentType: 'application/json',
  Authorization: 'Token token=' + store.user.token
}

/**
* Ajax Request to Update User
* @name updateUser
* @function
* @param {object} data - user object from form
* @return {object} returns either an error or response from server
*/
const updateUser = function (data) {
  return $.ajax({
    method: 'PATCH',
    url: config.apiOrigin + '/users/' + store.user.id,
    data,
    headers: headers
  })
}

/**
* Ajax Request to Change User's Password
* @name changePassword
* @function
* @param {object} data - passwords object from change password form
* @return {object} returns either an error or response from server
*/
const changePassword = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/change-password/',
    method: 'PATCH',
    data,
    headers: headers
  })
}

/**
* Ajax Request to Delete's the User's Account
* @name deleteAccount
* @function
* @return {object} returns either an error or response from server
*/
// Ajax Request to Delete's User's Account
const deleteAccount = function () {
  return $.ajax({
    url: config.apiOrigin + '/users/' + store.user.id,
    method: 'DELETE',
    headers: headers
  })
}

module.exports = {
  updateUser,
  changePassword,
  deleteAccount
}
