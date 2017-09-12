var bookshelf = require('./../config/sqlite').bookshelf

var User = bookshelf.Model.extend({
  tableName: 'users',
  useNullAsDefault:true,
})

var Posts = bookshelf.Model.extend({
  tableName: 'posts',
})

module.exports = {
  User: User,
  Post: Posts,
}
