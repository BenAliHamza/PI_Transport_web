const express= require("express")
const router= express.Router();

const {getReclamations} = require("./../controllers/Reclamation")

router.get('/', getReclamations);

module.exports = router ; 