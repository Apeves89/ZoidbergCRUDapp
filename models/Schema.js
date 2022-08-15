const mongoose = require('mongoose')

const artistSchema = new mongoose.Schema({
    title: String,
    name: String,
    image: String,
    type: String,
    level: Number,
    links: [
        String
    ],
    description: String,
},{timestamps:true})

const Artist = mongoose.model('Music', artistSchema);

module.exports = Artist;