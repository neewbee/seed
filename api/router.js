var user = require('./routes/users')
var posts = require('./routes/posts')

var APIV1 = '/api/v1'

module.exports = function (app) {

  /* User Routes */
  app.post(APIV1 + '/user', user.saveUser)
  app.patch(APIV1 + '/user/:id', user.updateUser)

  // TODO 逻辑删除
  app.delete(APIV1 + '/user/:id', user.deleteUser)

  app.get(APIV1 + '/user/:id', user.getUser)
  app.get(APIV1 + '/posts', posts.getAllPosts)

  app.get(APIV1 + '/users', user.getAllUsers)
  app.post(APIV1 + '/user/delete', user.deleteUsers)
}
