let mongoose = require("mongoose") 
let config = require("../config.json")


mongoose.connect(
    config.DB.URL, 
    config.DB.options
)

.then(() => {
    console.log("mongoDB connected....")
})
.catch(err => console.log(err));


let ProductSchema = new mongoose.Schema({
    name: String
})

module.exports = mongoose.model('Product', ProductSchema)