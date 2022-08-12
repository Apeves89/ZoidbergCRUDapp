// const mongoose = require('mongoose');

// const themeSchema = new mongoose.Schema({
//     type1: String,
//     type2: String,
//     type3: String,
//     type4: String
// },{timestamps:true});

// const Theme = mongoose.model('Collection', themeSchema);

// module.exports = Theme;
const mongoose = require('mongoose')

const artistSchema = new mongoose.Schema({
    image: String,
    description: String
})

const Artist = mongoose.model('Music', artistSchema);

module.exports = Artist;