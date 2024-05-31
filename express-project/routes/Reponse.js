const express = require('express');
const router = express.Router();
const reponseController = require('../controllers/Reponse');
const {verifyToken} = require("../middlewares/auth");

router.post('/', verifyToken , reponseController.createReponse);
router.get('/', verifyToken ,reponseController.getReponses);
router.get('/:id', verifyToken , reponseController.getReponse);
// router.patch('/:id', reponseController.updateReponse);
// router.delete('/:id', reponseController.deleteReponse);


module.exports = router;
