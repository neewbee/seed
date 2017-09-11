var Model = require('../models/index')

/* Save a user */
// FIXME isMale 字段
var saveUser = function(req, res) {
  const { address , age, email, isMale:gender, name, nickName, phone } = req.body
  new Model.User()
    .save({ address , age, email, gender, name, nickName, phone, created_at:Date.now()})
    .then(function() {
      res.status(201).end()
    })
    .catch(function(error) {
      console.log(error)
      res.status(500).send({code:500, message:"an error occurred"})
    })
}

// FIXME complete pagination implementation
/* Get all users */
var getAllUsers = function(req, res) {
  const { page, pageSize, name } = req.query

  new Model.User()
    .query(qb => {
      if (name) {
        qb.where('name', '=', name)
      }
      qb.orderBy('id', 'DESC')
      qb.offset(Number(pageSize) * Number(page)).limit(Number(pageSize))
    })
    .fetchAll()
    .then(function(users) {
      var result = Object.assign({}, { data: users }, req.query, {
        totalPage: 10,
      })
      console.log('result', result)
      res.json(result)
    })
    .catch(function(error) {
      console.log(error)
      res.send('An error occured')
    })
}

/* Delete a user */
var deleteUser = function(req, res) {
  var userId = req.params.id
  new Model.User().where('id', userId).destroy().catch(function(error) {
    console.log(error)
    res.send('An error occured')
  })
}

/* Get a user */
var getUser = function(req, res) {
  var userId = req.params.id
  new Model.User()
    .where('id', userId)
    .fetch()
    .then(function(user) {
      res.json(user)
    })
    .catch(function(error) {
      console.log(error)
      res.send('An error occured')
    })
}
/* Get a user */
var deleteUsers = function(req, res) {
  var userId = req.params.id
  new Model.User()
    .where('id', userId)
    .fetch()
    .then(function(user) {
      res.json(user)
    })
    .catch(function(error) {
      console.log(error)
      res.send('An error occured')
    })
}

/* Exports all methods */
module.exports = {
  saveUser: saveUser,
  getAllUsers: getAllUsers,
  deleteUsers: deleteUsers,
  deleteUser: deleteUser,
  getUser: getUser,
}
