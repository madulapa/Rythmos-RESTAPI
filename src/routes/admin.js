AdminModel = require('../models/admin.model');

const express = require('express');
const router = express.Router();
const keycloak = require('./../keycloak.js');
const { Db } = require('mongodb');
/**
 * Role: admin
 */
router.post('/admin', keycloak.keycloak.protect("Admin"), async (req, res) => {
    const admin = new AdminModel({
        name: req.body.name,
        email: req.body.email
    })
    try {
        const newAdmin = await admin.save()
        return res.status(201).json(newAdmin)
    }
    catch(err){
        return res.status(400).json(err)
    }  
})

/**
 * Role: admin
 */
router.get('/admin',keycloak.keycloak.protect("Admin"), async (req, res) => {
    try {
        const admins = await AdminModel.find();
        return res.json(admins);
    }
    catch(err) {
        return res.status(500).json(err)
    }
})

/**
 * Role: admin
 */
router.patch('/admin/:id', keycloak.keycloak.protect("Admin"), async (req, res) => {

    let admin = await getAdminbyId(req.params.id)

    if(admin.name != null) {
        admin.name = req.body.name
    }
    if(admin.email != null) {
        admin.email = req.body.email
    }
    try {
        const updatedAdmin = admin.save()
        return res.json(updatedAdmin)
    }
    catch (err) {
        return res.status(400).json(err)
    }
})

/**
 * Role: admin
 */
router.delete('/admin/:id', keycloak.keycloak.protect("Admin"), async (req, res) => {
    let admin = await getAdminbyId(req.params.id)
    try {
    await admin.remove()
    return res.json({message: "successfully deleted admin"})
 }
 catch (err) {
    return res.status(500).json(err)
 }
})
/**
 * Role: admin
 * Helper function for patch and delete 
 */
async function getAdminbyId(id)
{
    let admin = await AdminModel.findById(id)
    console.log(admin)
    if(admin == null){
        return null; 
    }
    return admin; 
}

module.exports = router