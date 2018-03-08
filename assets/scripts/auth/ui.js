const notifications = require('../../../lib/notifications')

const onSignInSuccess = function (data) {
  notifications.newNotification('success', 'Login Successful')
}

const onSignInError = function (error) {
  notifications.newNotification('danger', error.statusText)
}

module.exports = {
  onSignInSuccess,
  onSignInError
}
