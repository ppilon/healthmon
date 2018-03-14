const notificationDiv = '.notification-area'

const newNotification = function (status, message) {
  removeAllNotifications()
  if (status === 'success') {
    $(notificationDiv).append('<div class="alert alert-success alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' + message + '</div>')
  } else {
    $(notificationDiv).append('<div class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' + message + '</div>')
  }
}

const removeAllNotifications = function () {
  $(notificationDiv).html('')
}

module.exports = {
  newNotification,
  removeAllNotifications
}
