//routes 
const express = require('express')

const {createAnnonce, getAll } = require('../controllers/Annonce')

const router = express.Router()

router.post('', createAnnonce)
router.get('', getAll)

module.exports = router;


// CRUD 

// User=>Create authorization

// Get ALl => Partie anonce 


// GET by ID => une annonce 


// Update => $authorize() | req.user._id net2akdou menou createur d'annonce$

// Delete annonce $authorize().Admin() | req.user._id net2akdou menou createur d'annonce$