const express = require('express');
const router = express.Router();
const reponseController = require('../controllers/Reponse');
const {verifyToken, verifyAdmin} = require("../middlewares/auth");

router.post('/', verifyAdmin , reponseController.createReponse);
router.delete('/:id',verifyAdmin ,  reponseController.deleteResponse);
router.get('/', verifyAdmin ,reponseController.getReponses);
router.get('/:id', verifyAdmin , reponseController.getReponse);




router.put('/:id', reponseController.updateReponse);


module.exports = router;
