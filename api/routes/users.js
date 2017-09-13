import qs from 'qs'

const Model = require('../models/index')

/* Save a user */
// FIXME isMale 字段
const saveUser = function (req, res) {
  const { address , age, email, isMale:gender, name, nickName, phone } = req.body
  new Model.User()
    .save({ address , age, email, gender, name, nickName, phone, created_at:Date.now()})
    .then(function () {
      res.status(201).end()
    })
    .catch(function (error) {
      console.log(error)
      res.status(500).send({code:500, message:"an error occurred"})
    })
}

const updateUser = function (req, res) {
  const { address , age, email, isMale:gender, name, nickName, phone } = req.body
  const user_id = req.params.id
  console.log("patch:", user_id)
  new Model.User({id:user_id})
    .save({ address , age, email, gender, name, nickName, phone, updated_at:Date.now()})
    .then(function () {
      res.status(202).end()
    })
    .catch(function (error) {
      console.log(error)
      res.status(500).send({code:500, message:"an error occurred"})
    })
}

// FIXME complete pagination implementation
/* Get all users */
const getAllUsers = function (req, res) {
  const { name, address, createTime, page, pageSize } = qs.parse(req.query)
  console.log("params: ", qs.parse(req.query))
  new Model.User()
    .query(qb => {
      if ( name ) {
        qb.where('name', 'like', '%'+ name + '%')
      }
      if ( createTime && createTime.length ) {
        qb.where('created_at', '>', createTime[0]).andWhere('created_at', '<', createTime[1])
      }
      if (address) {
        qb.where('address', '=', address.join(' ') )
      }
      qb.orderBy('id', 'DESC')
      // qb.offset(Number(pageSize) * (Number(page) - 1)).limit(Number(pageSize))
    })
    .fetchAll()
    .then(function (users) {
      users.query((qb) => {
        qb.offset(Number(pageSize) * (Number(page) - 1)).limit(Number(pageSize))
        const result = Object.assign({}, { data: users }, req.query, {
          total: users.length,
        })
        res.json(result)
      })
    })
    .catch(function (error) {
      console.log(error)
      res.send('An error occured')
    })
}

/* Delete a user */
const deleteUser = function (req, res) {
  console.log(req.params.id)
  const userId = req.params.id
  new Model.User().where('id', userId).destroy().then(() => {
    res.status(202).end()
  }).catch(function (error) {
    console.log(error)
    res.send('An error occured')
  })
}

/* Get a user */
const getUser = function (req, res) {
  const userId = req.params.id
  new Model.User()
    .where('id', userId)
    .fetch()
    .then(function (user) {
      res.json(user)
    })
    .catch(function (error) {
      console.log(error)
      res.send('An error occured')
    })
}
/* Get a user */
const deleteUsers = function (req, res) {
  const userId = req.params.id
  new Model.User()
    .where('id', userId)
    .fetch()
    .then(function (user) {
      res.json(user)
    })
    .catch(function (error) {
      console.log(error)
      res.send('An error occured')
    })
}

/* Exports all methods */
module.exports = {
  saveUser: saveUser,
  updateUser: updateUser,
  getAllUsers: getAllUsers,
  deleteUsers: deleteUsers,
  deleteUser: deleteUser,
  getUser: getUser,
}
