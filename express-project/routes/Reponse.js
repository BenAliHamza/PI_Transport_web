const express = require('express');
const router = express.Router();
const reponseController = require('../controllers/Reponse');

router.post('/', reponseController.createReponse);
router.get('/', reponseController.getReponses);
router.get('/:id', reponseController.getReponse);
// router.patch('/:id', reponseController.updateReponse);
// router.delete('/:id', reponseController.deleteReponse);


module.exports = router;
