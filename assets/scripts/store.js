'use strict'

let user = {

}

if ('user' in sessionStorage) {
  const userData = JSON.parse(sessionStorage.getItem('user'))
  user = userData
  $('.name').text(user.email)
}

module.exports = {
  user
}
console.log(user)
