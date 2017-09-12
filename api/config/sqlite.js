var path = require("path");


var DBConfig = {
  dialect: 'sqlite3',
  connection: {
    filename: path.resolve( __dirname + './../../dev.sqlite3' )
  },
  useNullAsDefault:true
}

var knex = require('knex')(DBConfig)
var bookshelf = require('bookshelf')(knex)

module.exports.bookshelf = bookshelf
