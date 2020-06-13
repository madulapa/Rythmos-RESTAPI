let mongoose = require("mongoose") 

mongoose
.connect(
'mongodb+srv://laya-madulapally:testpassword@assignment1-psbm7.mongodb.net/assignment1_data?retryWrites=true&w=majority',
{
    useNewUrlParser: true,
    useUnifiedTopology: true
}
) 

.then(() => {
    console.log("mongoDB connected....")
})
.catch(err => console.log(err));


//mongoose.connect('mongodb+srv://laya-madulapally:testpass@assignment1-psbm7.mongodb.net/assignment1_data.customers?retryWrites=true&w=majority')

let CustomerSchema = new mongoose.Schema({
    name: String, 
    email: {
        type: String, 
        require: true, 
        unique: true
    }
})

module.exports = mongoose.model('Customer', CustomerSchema)