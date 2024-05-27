const express= require("express")
const router= express.Router();

const {getReponses} = require("./../controllers/Reponse")

router.get('/', getReponses);

module.exports = router;