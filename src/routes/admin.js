AdminModel = require('../models/admin.model')
ProductModel = require('../models/product.model')
CustomerModel = require('../models/customer.model')

let express = require('express')
let router = express.Router()
const keycloak = require('./../keycloak.js');


//ADMIN CONTROLS 
router.post('/admin', keycloak.keycloak.protect(), (req, res) => {
    if(!req.body){
        return res.status(400).send('Request body is missing')
    }
    else {
        let model = new AdminModel(req.body)
        model.save()
            .then(doc => {
                if(!doc || doc.length === 0){
                    return res.status(500).send(doc)
                }
                else {
                    res.status(201).send(doc)
                }
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
    
})
//get = recieve data  by name
router.get('/admin/:name', keycloak.keycloak.protect(), (req, res) => {
    if(!req.query.name) {
        return res.status(400).send('missing url param')
    }
    AdminModel.findOne({
        name: req.query.name
    })
    .then(doc => {
        res.send(`you have requested an admin ${req.query.name} with 
            the email ${req.query.email}`)
        res.json(500)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})
//delete by name 
/*
router.delete('/admin/:name', keycloak.keycloak.protect(), async (req, res) => {
    if(!req.query.name) {
        return res.status(400).send('missing url param')
    }

   try {
        const success = await req.delete(name)
        if(success){
            res.status(204).end()
        }
        else{
            res.status(404).end()
        }
    }
    catch(err) {
        res.status(500).json(err)
    }
    
})
*/

//CUSTOMER CONTROLS
//create new customer
router.post('/customer', keycloak.keycloak.protect(), (req, res) => {
    if(!req.body){
        return res.status(400).send('Request body is missing')
    }
    else {
        let model = new CustomerModel(req.body)
        model.save()
            .then(doc => {
                if(!doc || doc.length === 0){
                    return res.status(500).send(doc)
                }
                else {
                    res.status(201).send(doc)
                }
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
    
})
//get = recieve data  by name
router.get('/customer/:name', keycloak.keycloak.protect(), (req, res) => {
    if(!req.query.name) {
        return res.status(400).send('missing url param')
    }
    CustomerModel.findOne({
        name: req.query.name
    })
    .then(doc => {
        res.json(500)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})
//delete by name 
/*
router.delete('/customer/:name', keycloak.keycloak.protect(), (req, res) => {
    if(!req.query.name) {
        return res.status(400).send('missing url param')
    }
    CustomerModel.findOne({
        name: req.query.name
    })
    try {
        const success = await req.delete(name)
        if(success){
            res.status(204).end()
        }
        else{
            res.status(404).end()
        }
    }
    catch(err) {
        res.status(500).json(err)
    }
})
*/

//PRODUCT CONTROLS
router.post('/product', keycloak.keycloak.protect(), (req, res) => {
    if(!req.body){
        return res.status(400).send('Request body is missing')
    }
    else {
        let model = new ProductModel(req.body)
        model.save()
            .then(doc => {
                if(!doc || doc.length === 0){
                    return res.status(500).send(doc)
                }
                else {
                    res.status(201).send(doc)
                }
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
    
})
//get = recieve data  by name
router.get('/product/:name', keycloak.keycloak.protect(), (req, res) => {
    if(!req.query.name) {
        return res.status(400).send('missing url param')
    }
    ProductModel.findOne({
        name: req.query.name
    })
    .then(doc => {
        res.json(500)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})
//delete by name 
/*
router.delete('/product/:name', keycloak.keycloak.protect(), (req, res) => {
    if(!req.query.name) {
        return res.status(400).send('missing url param')
    }
    ProductModel.findOne({
        name: req.query.name
    })
    try {
        const success = await req.delete(name)
        if(success){
            res.status(204).end()
        }
        else{
            res.status(404).end()
        }
    }
    catch(err) {
        res.status(500).json(err)
    }
})
*/
module.exports = router