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
}

const onDeleteAccount = function (event) {
  console.log('worked')
  event.preventDefault()
  api.deleteAccount()
    .then(ui.onDeleteAccountSuccess)
    .catch(ui.onDeleteAccountError)
}

const onUpdateUser = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  console.log(data)
  api.updateUser(data)
    .then(ui.onUpdateUserSuccess)
    .catch(ui.onUpdateUserError)
}

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
