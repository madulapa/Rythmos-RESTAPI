ProductModel = require('../models/product.model')

let express = require('express')
let router = express.Router()
const keycloak = require('./../keycloak.js');

//create a product 
router.post('/product',  async (req, res) => {
    const product = new ProductModel({
        name: req.body.name
    })
    try {
        const newProduct = await product.save()
        res.status(201).json(newProduct)
    }
    catch(err){
        res.status(400).json(err)
    }  
})

//get ALL products
router.get('/product', async (req, res) => {
    try {
        const products = await ProductModel.find();
        res.json(products);
    }
    catch(err) {
        res.status(500).json(err)
    }
})
    
//update by id
router.patch('/product/:id', getProduct, async (req, res) => {
    if(req.body.name != null) {
        res.product.name = req.body.name
    }
    if(req.body.email != null) {
        res.product.email = req.body.email
    }
    try {
        const updatedProduct = await res.product.save()
        res.json(updatedProduct)
    }
    catch (err) {
        res.status(400).json(err)
    }
})

//delete by id
router.delete('/product/:id', getProduct, async (req, res) => {
 try {
    await res.product.remove()
    res.json({message: "successfully deleted product"})
 }
 catch (err) {
    res.status(500).json(err)
 }
})

//middleware helper func
async function getProduct(req, res, next)
{
    let product;
    try {
        product = await ProductModel.findById(req.params.id)
        if(product == null){
            return res.status(404).json({ message: "can't find product"})
        }
    }
    catch (err) {
        return res.status(500).json(err)
    }
    res.product = product
    next()
}
module.exports = router