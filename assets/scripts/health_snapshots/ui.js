const snapshotsTemplate = require('../templates/snapshots/snapshots.handlebars')
const newSnapshotTemplate = require('../templates/snapshots/new-snapshot.handlebars')
const api = require('./api')
const notifications = require('../../../lib/notifications')

const onGetSnapshotsSuccess = function (data) {
  const snapshots = snapshotsTemplate({ health_snapshots: data })
  const noSnapshots = snapshotsTemplate()
  const snapshotForm = newSnapshotTemplate()
  $('.content').empty()
  if (data.length > 0) {
    $('.content').append(snapshots)
    $('.content').append(snapshotForm)
  } else {
    $('.content').append(noSnapshots)
    $('.content').append(snapshotForm)
  }
}

const onGetSnapshotsError = function (error) {
  notifications.newNotification('danger', error.statusText)
}

const onCreateSnapshotSuccess = function (data) {
  notifications.newNotification('success', 'Successfully Created Snapshot')
  $('.snapshots-table tbody').append(
    '<tr>' +
    '<td>' + data.id + '</td><td>' + data.value + '</td>' +
    '<td>' + data.source_name + '</td>' + '<td>' + data.snapshot_type + '</td>' +
    '<td>' + data.start_date + '</td>' + '<td>' + data.end_date + '</td>' +
    '<td>' + data.unit + '</td>' + '<td>' +
    '<td> <button class="btn btn-primary edit-snapshot-btn" value="' + data.id + '"> Edit</button> </td>' +
    '<td> <button class="btn btn-danger delete-snapshot" value="' + data.id + '"> Delete</button> </td>' +
    '</tr>'
  )
}

const onCreateSnapshotError = function (error) {
  notifications.newNotification('danger', error.statusText)
}

const onDeleteSnapshotSuccess = function () {
  notifications.newNotification('success', 'Successfully Deleted Snapshot')
  api.getSnapshots()
    .then(onGetSnapshotsSuccess)
    .catch(onGetSnapshotsError)
}

const onEditSnapshotSuccess = function () {
  notifications.newNotification('success', 'Successfully Edited Snapshot')
  $('.modal-backdrop').remove()
  api.getSnapshots()
    .then(onGetSnapshotsSuccess)
    .catch(onGetSnapshotsError)
}

const onEditSnapshotError = function (error) {
  notifications.newNotification('danger', error.statusText)
}

const onDeleteSnapshotError = function (error) {
  notifications.newNotification('danger', error.statusText)
}

module.exports = {
  onGetSnapshotsSuccess,
  onGetSnapshotsError,
  onCreateSnapshotError,
  onCreateSnapshotSuccess,
  onDeleteSnapshotSuccess,
  onDeleteSnapshotError,
  onEditSnapshotError,
  onEditSnapshotSuccess
}
