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
const api = require('./api')
const notification = require('../../../lib/notifications')
const snapshotUploaderTemplate = require('../templates/snapshots/snapshot-uploader.handlebars')
const Dropzone = require('../../../lib/dropzone')
const config = require('../config')
const store = require('../store')
/**
* UI for Successfully Getting Snapshots
* @name onGetSnapshotsSuccess
* @param {array} data - array of snapshot objects
*/
const onGetSnapshotsSuccess = function (data) {
  const snapshots = snapshotsTemplate({ health_snapshots: data })
  const noSnapshots = snapshotsTemplate()
  $('.content').empty()
  if (data.length > 0) {
    $('.content').append(snapshots)
  } else {
    $('.content').append(noSnapshots)
  }
  $('.content').append(snapshotUploaderTemplate())
  uploader()
}

/**
* UI for not Successfully Getting Snapshots
* @name onGetSnapshotsError
* @param {object} error - ajax error object
*/
const onGetSnapshotsError = function (error) {
  $('.content').append(snapshotUploaderTemplate())
}

/**
* UI for Successfully Creating a Snapshot
* @name onCreateSnapshotSuccess
* @param {data} data - snapshot created returned from the server
*/
const onCreateSnapshotSuccess = function (data) {
  notification('success', 'Successfully Created Snapshot')
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
  $('#create-snapshot-modal').modal('hide')
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
  notification('success', 'Successfully Deleted Snapshot')
  api.getSnapshots()
    .then(onGetSnapshotsSuccess)
    .catch(onGetSnapshotsError)
}

/**
* UI for Successfully Editing a Snapshot
* @name onEditSnapshotSuccess
*/
const onEditSnapshotSuccess = function () {
  notification('success', 'Successfully Edited Snapshot')
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
  notification('danger', error.statusText)
}

/**
* UI for not Successfully Deleting a Snapshot
* @name onDeleteSnapshotError
* @param {object} error - ajax error object
*/
const onDeleteSnapshotError = function (error) {
  notification('danger', error.statusText)
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

const uploader = function() {
  const previews = "<div class='row'><div class='col-md-2 dz-filename'><span data-dz-name></span></div><div class='col-md-2 dz-size' data-dz-size></div><div class='col-md-2'><div class='progress'><div class='progress-bar progress-bar-striped active dz-upload' data-dz-uploadprogress role='progressbar' aria-valuenow='0' aria-valuemin='0' aria-valuemax='100' style='width: 0%'></div></div></div><div class='col-md-3 status'></div><div class='col-md-3 file-type'></div></div>"
  const dropzone = new Dropzone('#upload-form', {
    url: config.apiOrigin + '/upload',
    paramName: 'import[file]',
    previewTemplate: previews,
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    }
  })
  dropzone.on('success', function (file, response) {
    console.log('ransuccess')
    const previewElement = file.previewElement
    $(previewElement).find('div.progress').children().removeClass('progress-bar-striped').addClass('progress-bar-success').html('<span> 100% Complete </span>')
    $(previewElement).find('div.status').html('<span> Success </span>')
  })
  dropzone.on('error', function (file, errorMessage) {
    const previewElement = file.previewElement
    $(previewElement).find('div.progress').children().removeClass('progress-bar-striped').addClass('progress-bar-danger').css('width', '100%').html('<span> 0%</span>')
    $(previewElement).find('div.status').html('<span> Error </span>')
  })
  dropzone.on('complete', function (file) {
    $(file.previewElement).find('div.file-type').html(file.type)
  })
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
