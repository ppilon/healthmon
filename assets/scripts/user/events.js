/**
 *  @fileOverview Manages the events for users
 *
 *  @author       Phil Pilon
 *  @requires     /assets/scripts/user/api.js
 *  @requires     /assets/scripts/user/ui.js
 *  @requires     /lib/get-form-fields
 *  @requires     /assets/scripts/templates/user/update-user.handlebars
 *  @requires     /assets/scripts/store.js
 */

/** @module Users */

const api = require('./api')
const ui = require('./ui')
const getFormFields = require('../../../lib/get-form-fields')
const updateUserTemplate = require('../templates/user/update-user.handlebars')
const store = require('../store')


const userHandlers = function () {
  $('body').on('submit', '.user-update-form', onUpdateUser)
  $('.user-profile-toggle').on('click', function () {
    $('.content').empty()
    const updateUserTemp = updateUserTemplate({ user: store.user })
    $('.content').append(updateUserTemp)
  })
  $('body').on('click', '.delete-account', onDeleteAccount)
  $('body').on('submit', '.change-password-form', onChangePassword)
  $('body').on('click', '.toggle-update-user-profile', ui.showUserUpdateForm)
  $('body').on('click', '.toggle-change-pw', ui.showChangePasswordForm)
}

/**
* Delete Account Event
* @name onDeleteAccount
* @param {object} event - click event
*/
const onDeleteAccount = function (event) {
  event.preventDefault()
  api.deleteAccount()
    .then(ui.onDeleteAccountSuccess)
    .catch(ui.onDeleteAccountError)
}

/**
* Update User Event
* @name onUpdateUser
* @param {object} event - update user form submitted
*/
const onUpdateUser = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.updateUser(data)
    .then(ui.onUpdateUserSuccess)
    .catch(ui.onUpdateUserError)
}

/**
* UI for Successfully Updating a User
* @name onChangePassword
* @param {object} event - change password form submitted
*/
const onChangePassword = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.changePassword(data)
    .then(ui.onChangePasswordSuccess)
    .catch(ui.onChangePasswordError)
}

module.exports = {
  userHandlers
}
