let express = require('express')
let router = express.Router()

router.get('/person', (req, res) => {
    if(req.query.name){
        res.send(`you have requested a person ${req.query.name}`)
    }
    else {
        res.send('you have requested a person')
    }
        
})
//param property on request obj
router.get('/person/:name', (req, res) => {

    res.send(`you have requested a person ${req.params.name}`)
})

module.exports = router