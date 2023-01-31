const express = require('express');
const router =  express.Router();

// SCHEMA
const Artist = require('../models/Schema.js');
//SEED DATA
const data = require('../models/data.js');

//___________________
// Routes
//___________________
//localhost:3000

//---------------------FOR DEVELOPMENT PURPOSES ONLY---------------------
//SEED ROUTE
router.get('/seed',(req,res) => {
    Artist.create(data,(err,data) => {
        res.redirect('/')
    })
})
//CLEAR DATABASE ROUTE
router.get('/clear',(req,res) => {
    Artist.deleteMany({},(err,deletedArtists) => {
        res.redirect('/')
    })
})
//---------------------FOR DEVELOPMENT PURPOSES ONLY---------------------

//DELETE ROUTE
router.delete('/:id',(req,res) => {
    Artist.findByIdAndRemove(req.params.id, (err, deletedArtist) => {
        res.redirect('/')
    })
})

//EDIT ROUTE
router.get('/:id/edit',(req,res) => {
    Artist.findById(req.params.id, (err,foundArtist) => {
        res.render('edit.ejs',{
            artist:foundArtist,
            title: "Edit Project",
            currentUser: req.session.currentUser
        })      
    })
})

//UPDATE ROUTE
router.put('/:id',(req,res) => {
    Artist.findByIdAndUpdate(req.params.id,req.body,{new:true},(err,updatedModel) => {
        res.redirect('/')
    })
})

//INDEX ROUTE
router.get('/' , (req, res) => {
    Artist.find({},(err,allArtists) => {
        res.render('index.ejs', {
            artist:allArtists,
            title: "Home",
            currentUser: req.session.currentUser
        });      
    })
});

//NEW ROUTE
router.get('/new',(req,res) => {
    res.render('new.ejs',{
        title: "Submit Project",
        currentUser: req.session.currentUser
    })
})

//CREATE ROUTE
router.post('/',(req,res) => {
    Artist.create(req.body, (err,createdArtist) => {
        res.redirect('/')
    })  
})

//SHOW ROUTE
router.get('/show/:id',(req,res) => {
    Artist.findById(req.params.id, (err,foundArtist) => {
        res.render('show.ejs',{
            artist:foundArtist,
            title: foundArtist.title,
            currentUser: req.session.currentUser
        })
    })
})

module.exports = router;