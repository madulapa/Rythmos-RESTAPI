let express = require("express")
let app = express()
let customerRoute = require('./routes/customer')
let productRoute = require('./routes/product')
let adminRoute = require('./routes/admin')
let path = require('path')
let bodyParser = require('body-parser')
let Keycloak = require('keycloak-connect')
let config = require('./config.json')


app.use(bodyParser.json())
//middleware takes 3 param, request response and next (call to next func in pipeline)
app.use((req, res, next) => {
    console.log(`${new Date().toString()} => ${req.originalUrl}`)
    next()
})

app.use(customerRoute)
app.use(productRoute)
app.use(adminRoute)
app.use(express.static('public'))


// Create a session-store to be used by both the express-session
// middleware and the keycloak middleware.

var memoryStore = new session.MemoryStore();

app.use(session({
  secret: 'some secret',
  resave: false,
  saveUninitialized: true,
  store: memoryStore
}));


var keycloak = new Keycloak({
    store: memoryStore
});

app.use(keycloak.middleware())

app.get('/logoff', keycloak.protect(), (req, res) => {
  console.log('logout clicked')
  res.send('https://localhost:3000/logout')
})
app.use( keycloak.middleware( { logout: '/'}))
app.listen(3000, () => {});
//config.port