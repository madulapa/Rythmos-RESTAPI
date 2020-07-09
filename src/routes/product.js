ProductModel = require('../models/product.model')

const express = require('express');
const router = express.Router();
const keycloak = require('./../keycloak.js');

/**
 * Role: admin
 * create a product
 */
router.post('/product', keycloak.keycloak.protect("Admin"), async (req, res) => {
    const product = new ProductModel({
        name: req.body.name
    })
    try {
        const newProduct = await product.save()
        return res.status(201).json(newProduct)
    }
    catch(err){
        return res.status(400).json(err)
    }  
})

/**
 * Role: admin, customer
 * get all products
 */
router.get('/product', keycloak.keycloak.protect("Customer"),async (req, res) => {
    try {
        const products = await ProductModel.find();
        return res.json(products);
    }
    catch(err) {
        return res.status(500).json(err)
    }
})
    
/**
 * Role: admin
 * update product
 */
router.patch('/product/:id', keycloak.keycloak.protect("Admin"), async (req, res) => {
    let product = await getProductbyId(req.params.id)

    if(product.name != null) {
        product.name = req.body.name
    }
    if(product.email != null) {
        product.email = req.body.email
    }
    try {
        const updatedProduct = product.save()
        return res.json(updatedProduct)
    }
    catch (err) {
        return res.status(400).json(err)
    }
})

/**
 * Role: admin
 * delete a product
 */
router.delete('/product/:id', keycloak.keycloak.protect("Admin"), async (req, res) => {
    let product = await getProductbyId(req.params.id)
    try {
    await product.remove()
    return res.json({message: "successfully deleted product"})
 }
 catch (err) {
    return res.status(500).json(err)
 }
})

/**
 * Role: admin
 * helper function for patch and delete 
 */
async function getProductbyId(id)
{
    let product = await ProductModel.findById(id)
    console.log(product)
    if(product == null){
        return null; 
    }
    return product; 
}
module.exports = router