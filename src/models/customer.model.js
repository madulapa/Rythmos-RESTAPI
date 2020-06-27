//customers can only get products 

const mongoose = require("mongoose") 
const config = require("../config.json")


mongoose
.connect(
    config.DB.URL, 
    config.DB.options
)

.then(() => {
    console.log("mongoDB connected....")
})
.catch(err => console.log(err));

let CustomerSchema = new mongoose.Schema({
    name: String, 
    email: {
        type: String, 
        require: true, 
        unique: true
    }
})

module.exports = mongoose.model('Customer', CustomerSchema)