AdminModel = require('../models/admin.model')

let express = require('express')
let router = express.Router()
const keycloak = require('./../keycloak.js');

//create an admin
router.post('/admin', async (req, res) => {
    const admin = new AdminModel({
        name: req.body.name,
        email: req.body.email
    })
    try {
        const newAdmin = await admin.save()
        res.status(201).json(newAdmin)
    }
    catch(err){
        res.status(400).json(err)
    }  
})

//get ALL admins
router.get('/admin', async (req, res) => {
    try {
        const admins = await AdminModel.find();
        res.json(admins);
    }
    catch(err) {
        res.status(500).json(err)
    }
})
//update by id
router.patch('/admin/:id', getAdmin, async (req, res) => {
    if(req.body.name != null) {
        res.admin.name = req.body.name
    }
    if(req.body.email != null) {
        res.admin.email = req.body.email
    }
    try {
        const updatedAdmin = await res.admin.save()
        res.json(updatedAdmin)
    }
    catch (err) {
        res.status(400).json(err)
    }
})
//delete by id
router.delete('/admin/:id', getAdmin, async (req, res) => {
 try {
    await res.admin.remove()
    res.json({message: "successfully deleted admin"})
 }
 catch (err) {
    res.status(500).json(err)
 }
})

//middleware helper func
async function getAdmin(req, res, next)
{
    let admin;
    try {
        admin = await AdminModel.findById(req.params.id)
        if(admin == null){
            return res.status(404).json({ message: "can't find admin"})
        }
    }
    catch (err) {
        return res.status(500).json(err)
    }
    res.admin = admin
    next()
}

module.exports = router