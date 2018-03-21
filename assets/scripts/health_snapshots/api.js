/**
 *  @fileOverview Manages the api calls for Health Snapshots
 *
 *  @author       Phil Pilon
 *  @requires     /assets/scripts/config.js
 *  @requires     /assets/scripts/store.js
 */

  /**  @module HealthSnapshots */

const config = require('../config')
const store = require('../store')

// Ajax Headers
const headers = {
  contentType: 'application/json',
  Authorization: 'Token token=' + store.user.token
}

/**
* Ajax Request to get Snapshots
* @name getSnapshots
* @function
* @return {object} Returns the ajax request
*/
const getSnapshots = function () {
  return $.ajax({
    url: config.apiOrigin + '/health_snapshots',
    method: 'GET',
    headers: headers
  })
}

/**
* Ajax Request to create a Snapshot
* @name createSnapshot
* @function
* @param {object} data - snapshot form data
* @return {object} Returns the ajax request
*/
const createSnapshot = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/health_snapshots',
    method: 'POST',
    data,
    headers: headers
  })
}

/**
* Ajax Request to delete a Snapshot
* @name deleteSnapshot
* @function
* @param {integer} id - id of snapshot
* @return {object} Returns the ajax request
*/
const deleteSnapshot = function (id) {
  return $.ajax({
    url: config.apiOrigin + '/health_snapshots/' + id,
    method: 'DELETE',
    headers: headers
  })
}

/**
* Ajax Request to edit a Snapshot
* @name editSnapshot
* @function
* @param {integer} id - id of snapshot
* @param {object} data - snapshot form data
* @return {object} Returns the ajax request
*/
const editSnapshot = function (id, data) {
  return $.ajax({
    url: config.apiOrigin + '/health_snapshots/' + id,
    method: 'PATCH',
    data,
    headers: headers
  })
}

module.exports = {
  getSnapshots,
  createSnapshot,
  deleteSnapshot,
  editSnapshot
}
