const notifications = require('../../../lib/notifications')
const store = require('../store')

const onSignInSuccess = function (data) {
  notifications.newNotification('success', 'Login Successful')
  const form = document.getElementsByName('form-signin')[0]
  form.reset()
  $('.auth-view').toggle()
  $('.logged-in-view').toggle()
  $('.name').text(data.user.email)
  store.user.id = data.user.id
  store.user.email = data.user.email
  store.user.token = data.user.token
  store.user.user_profile = data.user.user_profile
  sessionStorage.setItem('user', JSON.stringify(store.user))
}

const onLogoutSuccess = function () {
  notifications.newNotification('success', 'Logout Successful')
  $('.auth-view').toggle()
  $('.logged-in-view').toggle()
  sessionStorage.removeItem('user')
}

const onLogoutError = function () {
}

const onSignInError = function (error) {
  notifications.newNotification('danger', error.statusText)
  $('#signin-email').val('')
  $('#signin-password').val('')
}

const onSignUpSuccess = function (data) {
  $('.form-signin').toggle()
  $('.form-signup').toggle()
  const form = document.getElementsByName('form-signup')[0]
  form.reset()
  notifications.newNotification('success', 'Signup Successful')
}

const onSignUpError = function (error) {
  notifications.newNotification('danger', error.statusText)
}

module.exports = {
  onSignInSuccess,
  onSignInError,
  onSignUpError,
  onSignUpSuccess,
  onLogoutSuccess,
  onLogoutError
}
