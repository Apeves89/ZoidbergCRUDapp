//___________________
//Dependencies
//___________________
const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const app = express ();
const db = mongoose.connection;
const Artist = require('./models/Schema.js')
const data = require('./models/data.js')
require('dotenv').config()
//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3003;

//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
mongoose.connect(MONGODB_URI);

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

//___________________
//Middleware
//___________________

//use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project

//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form


//___________________
// Routes
//___________________
//localhost:3000

//SEED ROUTE
app.get('/seed',(req,res) => {
    Artist.create(data,(err,data) => {
        res.redirect('/')
    })
})

//CLEAR DATABASE ROUTE
app.get('/clear',(req,res) => {
    Artist.deleteMany({},(err,deletedArtists) => {
        res.redirect('/')
    })
})

//DELETE ROUTE
app.delete('/:id',(req,res) => {
    Artist.findByIdAndRemove(req.params.id, (err, deletedArtist) => {
        res.redirect('/')
    })
})

//EDIT ROUTE
app.get('/:id/edit',(req,res) => {
    Artist.findById(req.params.id, (err,foundArtist) => {
        res.render('edit.ejs',{
            artist:foundArtist
        })      
    })
})

//UPDATE ROUTE
app.put('/:id',(req,res) => {
    Artist.findByIdAndUpdate(req.params.id,req.body,{new:true},(err,updatedModel) => {
        res.redirect('/')
    })
})

//INDEX ROUTE
app.get('/' , (req, res) => {
    Artist.find({},(err,allArtists) => {
        res.render('index.ejs', {
          artist:allArtists
        });      
    }).sort({name:1})
});

//NEW ROUTE
app.get('/new',(req,res) => {
  res.render('new.ejs')
})

//CREATE ROUTE
app.post('/',(req,res) => {
    Artist.create(req.body, (err,createdArtist) => {
        res.redirect('/')
    })  
})

//SHOW ROUTE
app.get('/show/:id',(req,res) => {
    Artist.findById(req.params.id, (err,foundArtist) => {
        res.render('show.ejs',{
            artist:foundArtist
        })
    })
})

//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));

