const express = require("express");
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config');
const GrantManager = require('../node_modules/keycloak-connect/middleware/auth-utils/grant-manager.js');
const Config = require('../node_modules/keycloak-connect/middleware/auth-utils/config');
const keycloak = require('./keycloak.js');
const jwt = require('jsonwebtoken')


const customerRoute = require('./routes/customer');
const productRoute = require('./routes/product');
const adminRoute = require('./routes/admin');


app.use (bodyParser.json())
app.use(cors())
//middleware takes 3 param, request response and next (call to next func in pipeline)
app.use((req, res, next) => {
    console.log(`${new Date().toString()} => ${req.originalUrl}`)
    next()
})

app.use(keycloak.session);
app.use(keycloak.keycloak.middleware());
app.use(customerRoute)
app.use(productRoute)
app.use(adminRoute)
app.use(express.static('public'))

this.grantManager = new GrantManager({
  realmUrl: "Rythmos-RESTAPI",
  clientID: "Store-transactions", 
  secret: "c27c0c3f-ebe6-4914-b551-ad70635875ce"
});

app.post('/login', (req,res)=> {
  const {login, password} = req.body; 
  return keycloak.grantManager.obtainDirectly(login,password).then(grant => {
        keycloak.storeGrant(grant, req, res);
      return res.json({access_token:grant.access_token.token})
  }).catch(err)
});
/*
app.post('/login', (req, res)=>{
  const user = {
    id: req.params.id,
    username: req.params.username,
    email: req.params.email
  }
  jwt.sign({user}, 'secretkey', (err, token) => {
    res.json({token});
  });
});
*/
app.get('/logoff', keycloak.keycloak.protect(), (req, res) => {
  console.log('logout clicked')
  res.send('https://localhost:3000/logout')
})
//app.use( keycloak.keycloak.middleware( { logout: '/'}))
app.listen(3000, () => {});
//config.port