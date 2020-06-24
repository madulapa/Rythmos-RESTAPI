//admins have access to all CRUD ops on customers and products

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


let AdminSchema = new mongoose.Schema({
    name: String, 
    email: {
        type: String, 
        require: true, 
        unique: true
    }
})

module.exports = mongoose.model('Admin', AdminSchema)