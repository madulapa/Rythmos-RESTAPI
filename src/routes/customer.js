CustomerModel = require('../models/customer.model')

const express = require('express');
const router = express.Router();
const keycloak = require('./../keycloak.js');

/**
 * Role: admin
 * create a customer
 */
router.post('/customer',  keycloak.keycloak.protect("Admin"), async (req, res) => {
    const customer = new CustomerModel({
        name: req.body.name,
        email: req.body.email
    })
    try {
        const newCustomer = await customer.save()
        return res.status(201).json(newCustomer)
    }
    catch(err){
        return res.status(400).json(err)
    }  
})

/**
 * Role: admin
 * Get all customers data
 */
router.get('/customer', keycloak.keycloak.protect("Admin"),async (req, res) => {
    try {
        const customers = await CustomerModel.find();
        return res.json(customers);
    }
    catch(err) {
        return res.status(500).json(err)
    }
})

/**
 * Role: admin and customer
 * update a customers data
 */
router.patch('/customer/:id', keycloak.keycloak.protect("Admin"), async (req, res) => {
    let customer = await getCustomerbyId(req.params.id)

    if(customer.name != null) {
        customer.name = req.body.name
    }
    if(customer.email != null) {
        customer.email = req.body.email
    }
    try {
        const updatedCustomer = await customer.save()
        return res.json(updatedCustomer)
    }
    catch (err) {
        return res.status(400).json(err)
    }
})
/**
 * Role: admin
 * delete a customer
 */
router.delete('/customer/:id', keycloak.keycloak.protect("Admin"), async (req, res) => {
    let customer = await getCustomerbyId(req.params.id)
    try {
    await customer.remove()
    return res.json({message: "successfully deleted customer"})
 }
 catch (err) {
    return res.status(500).json(err)
 }
})

/**
 * Role: admin
 * helper function for patch and delete
 */
async function getCustomerbyId(id)
{
    let customer = await CustomerModel.findById(id)
    console.log(customer)
    if(customer == null){
        return null; 
    }
    return customer; 
}
module.exports = router