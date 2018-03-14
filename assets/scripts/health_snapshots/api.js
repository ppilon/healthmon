const config = require('../config')
const store = require('../store')

const getSnapshots = function () {
  return $.ajax({
    url: config.apiOrigin + '/health_snapshots',
    method: 'GET',
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const createSnapshot = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/health_snapshots',
    method: 'POST',
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const deleteSnapshot = function (id) {
  return $.ajax({
    url: config.apiOrigin + '/health_snapshots/' + id,
    method: 'DELETE',
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const editSnapshot = function(id, data) {
  return $.ajax({
    url: config.apiOrigin + '/health_snapshots/' + id,
    method: 'PATCH',
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

module.exports = {
  getSnapshots,
  createSnapshot,
  deleteSnapshot,
  editSnapshot
}
