CustomerModel = require('../models/customer.model')

let express = require('express')
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
//get = recieve data 
router.get('/customer', (req, res) => {
    if(!req.query.email) {
        return res.status(400).send('missing url param')
    }
    CustomerModel.findOne({
        email: req.query.email
    })
    .then(doc => {
        res.json(500)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})
module.exports = router