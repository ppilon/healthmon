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

module.exports = {
  onUpdateUserSuccess,
  onUpdateUserError,
  onChangePasswordSuccess,
  onChangePasswordError
}
