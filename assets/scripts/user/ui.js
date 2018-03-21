/**
 *  @fileOverview Manages the interface for Users
 *  @author       Phil Pilon
 *  @requires     /lib/notifications.js
 */

/** @module Users */

const Notification = require('../../../lib/notifications')

/**
* UI for Successfully Updating a User
* @name onUpdateUserSuccess
* @param {object} data - updated user returned from server
*/
const onUpdateUserSuccess = function (data) {
  const form = document.getElementsByName('user-update-form')[0]
  form.reset()
  new Notification('success', 'Update Successful')
}

/**
* UI for Successfully Updating a User
* @name onUpdateUserError
* @param {object} error - error returned from server
*/
const onUpdateUserError = function (error) {
  new Notification('danger', error.statusText)
}

/**
* UI for Successfully Changing a User's password
* @name onChangePasswordSuccess
*/
const onChangePasswordSuccess = function () {
  const form = document.getElementsByName('change-password-form')[0]
  form.reset()
  new Notification('success', 'Change Password Successful')
}

const onChangePasswordError = function (error) {
  new Notification('danger', error.statusText)
}

/**
* Shows the User's Update Form
* @name showUserUpdateForm
* @param {object} event - Click Event
*/
const showUserUpdateForm = function (event) {
  event.preventDefault()
  $('.change-password-form').hide()
  $('.user-update-form').show()
}

/**
* Shows the User's Change Password Form
* @name showChangePasswordForm
* @param {object} event - Click Event
*/
const showChangePasswordForm = function (event) {
  event.preventDefault()
  $('.user-update-form').hide()
  $('.change-password-form').show()
}

/**
* UI for Successfully Deleting a User's Account
* @name onDeleteAccountSuccess
*/
const onDeleteAccountSuccess = function () {
  $('.auth-view').toggle()
  $('.logged-in-view').toggle()
  $('.modal-backdrop').remove()
  sessionStorage.removeItem('user')
}

/**
* UI for getting an error while deleting a User's Account
* @name onDeleteAccountSuccess
*/
const onDeleteAccountError = function (error) {
  new Notification('danger', error.statusText)
}

module.exports = {
  onUpdateUserSuccess,
  onUpdateUserError,
  onChangePasswordSuccess,
  onChangePasswordError,
  onDeleteAccountError,
  onDeleteAccountSuccess,
  showUserUpdateForm,
  showChangePasswordForm
}
