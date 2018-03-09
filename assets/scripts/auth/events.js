const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')

const authHandlers = function () {
  $('.form-signin').on('submit', onSignIn)
  $('.form-signup').on('submit', onSignUp)
  $('.toggle-signup-view, .toggle-login-view').on('click', function () {
    $('.form-signin').toggle()
    $('.form-signup').toggle()
  })
}

const onSignUp = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.signUp(data)
    .then(ui.onSignUpSuccess)
    .catch(ui.onSignUpError)
}

const onSignIn = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.signIn(data)
    .then(ui.onSignInSuccess)
    .catch(ui.onSignInError)
}

module.exports = {
  authHandlers
}
