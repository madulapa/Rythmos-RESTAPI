const mongoose = require("mongoose");
const db = require('../db.js');

let ProductSchema = new mongoose.Schema({
    name: String
})

module.exports = mongoose.model('Product', ProductSchema)