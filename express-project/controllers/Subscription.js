const { body,param, validationResult } = require('express-validator');
const Subscription = require('../models/Subscription');


const GetSubscriptionsController =  async (req, res) => {
    try {
      const {topic, user}  = req.query
  
      const filter = {};
      if (topic) {
        filter.topic = new RegExp(`^${topic}$`, 'i');
      }
  
      if (user) {
        filter.user = user
      }
      const subscriptions = await Subscription.find(filter);
      res.status(200).json(subscriptions);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

const DeleteSubscriptionController = async (req, res) => {
    const { id } = req.params;
  try{
    const sub = await Subscription.findById(id);
    if (!sub) {
      return res.status(404).json({ message: 'sub not found' });
    }
  
    if(sub.user.toString() != req.user._id  && req.user.role != "ADMIN")
      {
        return res.status(401).json({ message: 'Unauthorized To Make This Operation' });
      }
  
    await Subscription.findByIdAndDelete(id);
  
    res.status(200).json({ message: 'sub deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }}

const ConsultSubscriptionsContoller = async (req, res) => {
    try {
      const subscriptions = await Subscription.find({user : req.user._id});
      res.status(200).json(subscriptions);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }


const CreateSubscriptionController  = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    try {
      const subscription = new Subscription({
        user: req.user._id,
        topic: req.body.topic,
      });
      await subscription.save();
      res.status(201).json(subscription);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
module.exports = {DeleteSubscriptionController , ConsultSubscriptionsContoller , CreateSubscriptionController, GetSubscriptionsController}