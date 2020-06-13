let express = require("express")
let app = express()
let personRoute = require('./routes/person')
let customerRoute = require('./routes/customer')
let path = require('path')
let bodyParser = require('body-parser')


app.use(bodyParser.json())
//middleware takes 3 param, request response and next (call to next func in pipeline)
app.use((req, res, next) => {
    console.log(`${new Date().toString()} => ${req.originalUrl}`)
    next()
})
app.use(personRoute)
app.use(customerRoute)
app.use(express.static('public'))

//read in port form cmd line, or if not inputted, default to 3000
//const PORT = process.send.PORT || 3000
app.listen(3000, () => {});