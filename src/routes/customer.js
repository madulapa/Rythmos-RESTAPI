CustomerModel = require('../models/customer.model')

let express = require('express')
let router = express.Router()
const keycloak = require('./../keycloak.js');

//create a customer
router.post('/customer',  async (req, res) => {
    const customer = new CustomerModel({
        name: req.body.name,
        email: req.body.email
    })
    try {
        const newCustomer = await customer.save()
        res.status(201).json(newCustomer)
    }
    catch(err){
        res.status(400).json(err)
    }  
})

//get ALL customers
router.get('/customer', async (req, res) => {
    try {
        const customers = await CustomerModel.find();
        res.json(customers);
    }
    catch(err) {
        res.status(500).json(err)
    }
})

//update by id
router.patch('/customer/:id', getCustomer, async (req, res) => {
    if(req.body.name != null) {
        res.customer.name = req.body.name
    }
    if(req.body.email != null) {
        res.customer.email = req.body.email
    }
    try {
        const updatedCustomer = await res.customer.save()
        res.json(updatedCustomer)
    }
    catch (err) {
        res.status(400).json(err)
    }
})
//delete by id
router.delete('/customer/:id', getCustomer, async (req, res) => {
 try {
    await res.customer.remove()
    res.json({message: "successfully deleted customer"})
 }
 catch (err) {
    res.status(500).json(err)
 }
})

//middleware helper func
async function getCustomer(req, res, next)
{
    let customer;
    try {
        customer = await CustomerModel.findById(req.params.id)
        if(customer == null){
            return res.status(404).json({ message: "can't find customer"})
        }
    }
    catch (err) {
        return res.status(500).json(err)
    }
    res.customer = customer
    next()
}
module.exports = router