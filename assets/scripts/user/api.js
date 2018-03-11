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

module.exports = {
  updateUser
}
