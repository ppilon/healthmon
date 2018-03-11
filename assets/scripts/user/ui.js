const notifications = require('../../../lib/notifications')

const onUpdateUserSuccess = function (data) {
  console.log(data)
  notifications.newNotification('success', 'Update Successful')
}

const onUpdateUserError = function (error) {
  console.log(error)
  notifications.newNotification('danger', error)
}

module.exports = {
  onUpdateUserSuccess,
  onUpdateUserError
}
