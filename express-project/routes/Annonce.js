//routes
const express = require('express')

const {createAnnonce, getAll, getById, updateAnnonce, deleteAnnonce } = require('../controllers/Annonce')
const {verifyToken} = require("../middlewares/auth");

const router = express.Router()

router.post('', verifyToken,  createAnnonce)
router.get('' ,  getAll)
router.get('/:id' ,  getById)
router.put('/:id',verifyToken ,  updateAnnonce)
router.delete('/:id',verifyToken ,  deleteAnnonce)

module.exports = router;


// CRUD

// User=>Create authorization

// Get ALl => Partie anonce


// GET by ID => une annonce


// Update => $authorize() | req.user._id net2akdou menou createur d'annonce$

// Delete annonce $authorize().Admin() | req.user._id net2akdou menou createur d'annonce$
