const notifications = require('../../../lib/notifications')

const onUpdateUserSuccess = function (data) {
  const form = document.getElementsByName('user-update-form')[0]
  form.reset()
  notifications.newNotification('success', 'Update Successful')
}

const onUpdateUserError = function (error) {
  notifications.newNotification('danger', error.statusText)
}

const onChangePasswordSuccess = function () {
  const form = document.getElementsByName('change-password-form')[0]
  form.reset()
  notifications.newNotification('success', 'Change Password Successful')
}

const onChangePasswordError = function (error) {
  notifications.newNotification('danger', error.statusText)
}

const onDeleteAccountSuccess = function () {
  $('.auth-view').toggle()
  $('.logged-in-view').toggle()
  $('.modal-backdrop').remove()
  sessionStorage.removeItem('user')
}

const onDeleteAccountError = function (error) {
  notifications.newNotification('danger', error.statusText)
}

module.exports = {
  onUpdateUserSuccess,
  onUpdateUserError,
  onChangePasswordSuccess,
  onChangePasswordError,
  onDeleteAccountError,
  onDeleteAccountSuccess
}
