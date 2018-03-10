'use strict'

const user = {

}

if ('user' in sessionStorage) {
  const userData = JSON.parse(sessionStorage.getItem('user'))
  console.log(user)
  user.id = userData.id
  user.email = userData.email
  user.token = userData.token
  user.user_profile = userData.user_profile
  $('.name').text(user.email)
}

module.exports = {
  user
}
