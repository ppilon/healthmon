/**
 *  @fileOverview Manages events for Health Snapshots
 *
 *  @author       Phil Pilon
 *  @requires     /assets/scripts/health_snapshots/api.js
 *  @requires     /assets/scripts/health_snapshots/ui.js
 *  @requires     /lib/get-form-fields.js
 */

 /**  @module HealthSnapshots */

const api = require('./api')
const ui = require('./ui')
const getFormFields = require('../../../lib/get-form-fields')


/**
* Snapshot Handlers
* @name snapshotHandlers
*/
const snapshotHandlers = function () {
  $('body').on('submit', '.create-snapshot', onCreateSnapshot)
  $('body').on('click', '.delete-snapshot', onDeleteSnapshot)
  $('body').on('submit', '.edit-snapshot', onEditSnapshot)
  $('body').on('click', '.edit-snapshot-btn', ui.showEditSnapshotModal)
  $('body').on('click', '.toggle-snapshots', function (event) {
    event.preventDefault()
    $('.content').empty()
    $('.open-snapshot-modal').css('display', 'block')
    onGetSnapshots(event)
  })
  $('body').on('click', '.open-snapshot-modal', function() {
    $('#create-snapshot-modal').modal('show')
  })
}
/**
* Calls the snapshot api and passes
* @name onGetSnapshots
* @param {object} event - Click Event
*/
const onGetSnapshots = function (event) {
  event.preventDefault()
  api.getSnapshots()
    .then(ui.onGetSnapshotsSuccess)
    .catch(ui.onGetSnapshotsError)
}

/**
* Snapshot Handlers
* @name onEditSnapshot
* @param {object} event - Click Event
*/
const onEditSnapshot = function (event) {
  event.preventDefault()
  const snapshotId = $('.snapshot-id').val()
  const data = getFormFields(event.target)
  api.editSnapshot(snapshotId, data)
    .then(ui.onEditSnapshotSuccess)
    .catch(ui.onEditSnapshotError)
}

/**
* Snapshot Handlers
* @name onDeleteSnapshot
* @param {object} event - Click Event
*/
const onDeleteSnapshot = function () {
  event.preventDefault()
  const snapshotId = $(this).val()
  api.deleteSnapshot(snapshotId)
    .then(ui.onDeleteSnapshotSuccess)
    .catch(ui.onDeleteSnapshotError)
}

/**
* Snapshot Handlers
* @name onCreateSnapshot
* @param {object} event - Click Event
*/
const onCreateSnapshot = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.createSnapshot(data)
    .then(ui.onCreateSnapshotSuccess)
    .catch(ui.onCreateSnapshotError)
}

module.exports = {
  snapshotHandlers,
  onGetSnapshots
}
