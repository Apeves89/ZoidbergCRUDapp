//Dependencies
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session')
const methodOverride = require('method-override');
const app = express();
const db = mongoose.connection;
require('dotenv').config()

//Port
const PORT = process.env.PORT || 3003;

//Database
const MONGODB_URI = process.env.MONGODB_URI;

//Middleware 
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));
app.use(methodOverride('_method'));

//USER AUTH & SESSION
const isAuthenticated = (req, res, next) => {
    if (req.session.currentUser) {
      return next()
    } else {
      res.redirect('/sessions/new')
    }
}
app.use(
    session({
      secret: process.env.SECRET,
      resave: false,
      saveUninitialized: false
    })
)

//Controllers
const sessionsController = require('./controllers/sessionsController.js')
app.use('/sessions', sessionsController)

const userController = require('./controllers/usersController.js')
app.use('/user', userController)

const projectsController = require('./controllers/projectsController.js')
app.use(projectsController)


// Connect to Mongo
mongoose.connect(MONGODB_URI);

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

//Listener
app.listen(PORT, () => console.log( 'Listening on port:', PORT));

