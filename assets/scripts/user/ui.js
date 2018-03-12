const notifications = require('../../../lib/notifications')

const onUpdateUserSuccess = function (data) {
  console.log(data)
  notifications.newNotification('success', 'Update Successful')
}

const onUpdateUserError = function (error) {
  notifications.newNotification('danger', error.statusText)
}

const onChangePasswordSuccess = function () {
  notifications.newNotification('success', 'Change Password Successful')
}

const onChangePasswordError = function (error) {
  notifications.newNotification('danger', error.statusText)
}

const onDeleteAccountSuccess = function () {
  $('.auth-view').toggle()
  $('.logged-in-view').toggle()
  sessionStorage.removeItem('user')
}

const onDeleteAccountError = function (error) {
  console.log(error)
}

module.exports = {
  onUpdateUserSuccess,
  onUpdateUserError,
  onChangePasswordSuccess,
  onChangePasswordError,
  onDeleteAccountError,
  onDeleteAccountSuccess
}
