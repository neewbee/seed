var path = require("path");

const fs = require("fs"); //Load the filesystem module


const stats = fs.statSync("./../../dev.sqlite3")
const stats1 = fs.statSync(path.resolve( __dirname + './../../dev.sqlite3' ))

const fileSizeInBytes = stats.size
const fileSizeInBytes1 = stats1.size


console.log("fileSizeInBytes", fileSizeInBytes, fileSizeInBytes1)
console.log("__dirname ", path.resolve( __dirname + './../../dev.sqlite3' ))



var DBConfig = {
  dialect: 'sqlite3',
  connection: {
    filename: path.resolve( __dirname + './../../dev.sqlite3' )
  },
  debug: true,
  useNullAsDefault:true
}

var knex = require('knex')(DBConfig)
var bookshelf = require('bookshelf')(knex)

module.exports.bookshelf = bookshelf
