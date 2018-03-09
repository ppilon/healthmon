const notifications = require('../../../lib/notifications')

const onSignInSuccess = function (data) {
  notifications.newNotification('success', 'Login Successful')
  $('#signin-email').val('')
  $('#signin-password').val('')
}

const onSignInError = function (error) {
  notifications.newNotification('danger', error.statusText)
  $('#signin-email').val('')
  $('#signin-password').val('')
}

const onSignUpSuccess = function (data) {
  $('.form-signin').toggle()
  $('.form-signup').toggle()
  notifications.newNotification('success', 'Signup Successful')
}

const onSignUpError = function (error) {
  notifications.newNotification('danger', error.statusText)
}

module.exports = {
  onSignInSuccess,
  onSignInError,
  onSignUpError,
  onSignUpSuccess
}
