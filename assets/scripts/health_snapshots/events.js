const api = require('./api')
const ui = require('./ui')
const getFormFields = require('../../../lib/get-form-fields')

const snapshotHandlers = function () {
  $('body').on('click', '.toggle-snapshots', function (event) {
    event.preventDefault()
    $('.content').empty()
    onGetSnapshots(event)
  })
  $('body').on('submit', '.create-snapshot', onCreateSnapshot)
  $('body').on('click', '.delete-snapshot', onDeleteSnapshot)
  $('body').on('submit', '.edit-snapshot', onEditSnapshot)
}

const onGetSnapshots = function (event) {
  event.preventDefault()
  api.getSnapshots()
    .then(ui.onGetSnapshotsSuccess)
    .catch(ui.onGetSnapshotsError)
}

const onEditSnapshot = function (event) {
  event.preventDefault()
  const snapshotId = $('.snapshot-id').val()
  const data = getFormFields(event.target)
  api.editSnapshot(snapshotId, data)
    .then(ui.onEditSnapshotSuccess)
    .catch(ui.onEditSnapshotError)
}

const onDeleteSnapshot = function () {
  event.preventDefault()
  const snapshotId = $(this).val()
  api.deleteSnapshot(snapshotId)
    .then(ui.onDeleteSnapshotSuccess)
    .catch(ui.onDeleteSnapshotError)
}

const onCreateSnapshot = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.createSnapshot(data)
    .then(ui.onCreateSnapshotSuccess)
    .catch(ui.onCreateSnapshotError)
}

module.exports = {
  snapshotHandlers,
  onGetSnapshots,
}
