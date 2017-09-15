var Model = require('../models/index')


/* Get all users */
var getAllPosts = function (req, res) {
  new Model.Post()
    .fetchAll()
    .then(function (users) {
      res.json(users)
    })
    .catch(function (error) {
      console.log(error)
      res.send('An error occured')
    })
}

/* Exports all methods */
module.exports = {
  getAllPosts:getAllPosts,
}
