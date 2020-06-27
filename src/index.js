let express = require("express")
let app = express()
let customerRoute = require('./routes/customer')
let productRoute = require('./routes/product')
let adminRoute = require('./routes/admin')
let path = require('path')
let bodyParser = require('body-parser')
let cors = require('cors')
let config = require('./config')
const keycloak = require('./keycloak.js')

app.use(bodyParser.json())
app.use(cors())
//middleware takes 3 param, request response and next (call to next func in pipeline)
app.use((req, res, next) => {
    console.log(`${new Date().toString()} => ${req.originalUrl}`)
    next()
})

//app.use(keycloak.session);
//app.use(keycloak.keycloak.middleware);
app.use(customerRoute)
app.use(productRoute)
app.use(adminRoute)
app.use(express.static('public'))


app.get('/logoff', keycloak.keycloak.protect(), (req, res) => {
  console.log('logout clicked')
  res.send('https://localhost:3000/logout')
})
//app.use( keycloak.keycloak.middleware( { logout: '/'}))
app.listen(3000, () => {});
//config.port