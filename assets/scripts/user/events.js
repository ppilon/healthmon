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
}

const onUpdateUser = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  console.log(data)
  api.updateUser(data)
    .then(ui.onUpdateUserSuccess)
    .catch(ui.onUpdateUserError)
}

module.exports = {
  userHandlers
}
