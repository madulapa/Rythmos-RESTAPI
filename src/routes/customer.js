CustomerModel = require('../models/customer.model')
ProductModel = require('../models/product.model')

let express = require('express')
let keycloak = require('keycloak-connect')
let router = express.Router()


//create new customer
//post = send data
router.post('/customer', (req, res) => {
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
/*
//get = recieve data  by name
router.get('/customer/:name', (req, res) => {
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
router.delete('/customer/:name', (req, res) => {
    if(!req.query.name) {
        return res.status(400).send('missing url param')
    }
    CustomerModel.findOne({
        name: req.query.name
    })
    .then(doc => {
        res.delete
    })
    .catch(err => {
        res.status(500).json(err)
    })
})
*/

router.get('/product/:name', keycloak.protect(), (req, res) => {
    if(!req.query.name) {
        return res.status(400).send('missing url param')
    }
    CustomerModel.findOne({
        name: req.query.name
    })
    .then(doc => {
        console.log("Product is: ")
        console.log(name)
        res.json(500)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

module.exports = router