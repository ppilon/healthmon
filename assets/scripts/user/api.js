const config = require('../config')
const store = require('../store')

const updateUser = function (data) {
  return $.ajax({
    method: 'PATCH',
    url: config.apiOrigin + '/users/' + store.user.id,
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const changePassword = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/change-password/',
    method: 'PATCH',
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const deleteAccount = function () {
  return $.ajax({
    url: config.apiOrigin + '/users/' + store.user.id,
    method: 'DELETE',
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  updateUser,
  changePassword,
  deleteAccount
}
