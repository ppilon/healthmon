/**
 *  @fileOverview Manages the interface for Health Snapshots
 *
 *  @author       Phil Pilon
 *  @requires     /assets/scripts/templates/snapshots/snapshots.handlebars
 *  @requires     /assets/scripts/templates/snapshots/new-snapshot.handlebars
 *  @requires     /assets/scripts/health_snapshots/api.js
 *  @requires     /lib/notifications.js
 */

  /**  @module HealthSnapshots */

const snapshotsTemplate = require('../templates/snapshots/snapshots.handlebars')
const newSnapshotTemplate = require('../templates/snapshots/new-snapshot.handlebars')
const api = require('./api')
const notifications = require('../../../lib/notifications')

/**
* UI for Successfully Getting Snapshots
* @name onGetSnapshotsSuccess
* @param {array} data - array of snapshot objects
*/
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

/**
* UI for not Successfully Getting Snapshots
* @name onGetSnapshotsError
* @param {object} error - ajax error object
*/
const onGetSnapshotsError = function (error) {
}

/**
* UI for Successfully Creating a Snapshot
* @name onCreateSnapshotSuccess
* @param {data} data - snapshot created returned from the server
*/
const onCreateSnapshotSuccess = function (data) {
  new Notification('success', 'Successfully Created Snapshot')
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
  const form = document.getElementsByName('create-snapshot')[0]
  form.reset()
}

/**
* UI for Successfully Creating a Snapshot
* @name onCreateSnapshotError
* @param {object} error - ajax error object
*/
const onCreateSnapshotError = function (error) {
  new Notification('danger', error.statusText)
}

/**
* UI for Successfully Deleting a Snapshot
* @name onDeleteSnapshotSuccess
*/
const onDeleteSnapshotSuccess = function () {
  new Notification('success', 'Successfully Deleted Snapshot')
  api.getSnapshots()
    .then(onGetSnapshotsSuccess)
    .catch(onGetSnapshotsError)
}

/**
* UI for Successfully Editing a Snapshot
* @name onEditSnapshotSuccess
*/
const onEditSnapshotSuccess = function () {
  new Notification('success', 'Successfully Edited Snapshot')
  const form = document.getElementsByName('edit-snapshot')[0]
  form.reset()
  $('.modal-backdrop').remove()
  api.getSnapshots()
    .then(onGetSnapshotsSuccess)
    .catch(onGetSnapshotsError)
}

/**
* UI for not Successfully Editing a Snapshot
* @name onEditSnapshotSuccess
* @param {object} error - ajax error object
*/
const onEditSnapshotError = function (error) {
  new Notification('danger', error.statusText)
}

/**
* UI for not Successfully Deleting a Snapshot
* @name onDeleteSnapshotError
* @param {object} error - ajax error object
*/
const onDeleteSnapshotError = function (error) {
  new Notification('danger', error.statusText)
}

/**
* Shows Edit Snapshot Modal
* @name showEditSnapshotModal
*/
const showEditSnapshotModal = function () {
  // Gives the hidden input .snapshot-id the value of the
  $('.snapshot-id').val($(this).val())
  $('#edit-snapshot-modal').modal('show')
}

module.exports = {
  onGetSnapshotsSuccess,
  onGetSnapshotsError,
  onCreateSnapshotError,
  onCreateSnapshotSuccess,
  onDeleteSnapshotSuccess,
  onDeleteSnapshotError,
  onEditSnapshotError,
  onEditSnapshotSuccess,
  showEditSnapshotModal
}
