const Keycloak = require('keycloak-connect')
const session = require('express-session')

var memoryStore = new session.MemoryStore();


let _keycloak = {};


  _keycloak.session = session({
    secret: 'some secret',
    resave: false,
    saveUninitialized: true,
    store: memoryStore
  });

  _keycloak.keycloak = new Keycloak({
    store: memoryStore
  });

  module.exports = _keycloak;

