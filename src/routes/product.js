ProductModel = require('../models/product.model')

let express = require('express')
let router = express.Router()
const keycloak = require('./../keycloak.js');

//post = send data
router.post('/product', keycloak.keycloak.protect(),(req, res) => {
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

module.exports = router