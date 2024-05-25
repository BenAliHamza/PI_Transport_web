//routes 
const express = require('express')

const {createAnnonce, getAll, getById, updateAnnonce, deleteAnnonce } = require('../controllers/Annonce')

const router = express.Router()

router.post('', createAnnonce)
router.get('', getAll)
router.get('/:id', getById)
router.put('/:id', updateAnnonce)
router.delete('/:id', deleteAnnonce)

module.exports = router;


// CRUD 

// User=>Create authorization

// Get ALl => Partie anonce 


// GET by ID => une annonce 


// Update => $authorize() | req.user._id net2akdou menou createur d'annonce$

// Delete annonce $authorize().Admin() | req.user._id net2akdou menou createur d'annonce$