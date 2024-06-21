const express = require('express');
const { body,param, validationResult } = require('express-validator');
const { verifyToken } = require('../middlewares/auth');
const { DeleteSubscriptionController, ConsultSubscriptionsContoller, GetSubscriptionsController, CreateSubscriptionController } = require('../controllers/Subscription');

const router = express.Router();

router.post('/subscribe', verifyToken, [
  body('topic').isString().withMessage('Topic must be a string'),
], CreateSubscriptionController);

router.delete('/:id',  param('id').isMongoId().withMessage('Invalid Id'),verifyToken, DeleteSubscriptionController);

router.get('/consult', verifyToken, ConsultSubscriptionsContoller);

router.get('/', verifyToken, GetSubscriptionsController );
module.exports = router;