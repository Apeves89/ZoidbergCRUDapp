const bcrypt = require('bcrypt')
const express = require('express')
const users = express.Router()
const User = require('../models/userSchema.js')

users.get('/new', (req, res) => {
  res.render('users/new.ejs', 
  {
    currentUser: req.session.currentUser,
    title: "Register"
  })
})

users.post('/', (req, res) => {
  //overwrite the user password with the hashed password, then pass that in to our database
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
  User.create(req.body, (err, createdUser) => {
    console.log('user is created', createdUser)
    res.redirect('/sessions/new')
  })
})

module.exports = users