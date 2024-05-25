const express = require('express');
const { body, param , validationResult } = require('express-validator');
const router = express.Router();
const Offre = require('../models/Offre'); // Adjust the path as needed
const {AddOffreValidator, UpdateOffreValidator , GetOffresValidator, GetOffreValidator} = require('../validators/Offre')

// Middleware to handle validation results
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Create a new offer
router.post(
    '/',
    AddOffreValidator,
    validate,
    async (req, res) => {
        try {
            const newOffer = new Offre(req.body);
            await newOffer.save();
            res.status(201).send(newOffer);
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    }
);

router.patch(
    '/:id',
    UpdateOffreValidator
   ,
    validate,
    async (req, res) => {
        const updates = Object.keys(req.body);
        const allowedUpdates = ['titre', 'lieu_depart', 'lieu_arrive', 'heure_depart', 'type', 'vehicule'];
        const isValidOperation = updates.every(update => allowedUpdates.includes(update));

        if (!isValidOperation) {
            return res.status(400).send({ error: 'Invalid updates!' });
        }

        try {
            const offer = await Offre.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
            if (!offer) {
                return res.status(404).send({ error: 'Offer not found' });
            }
            res.send(offer);
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    }
);

router.get('/:id', GetOffreValidator, async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const _id = req.params.id;
    try {
        const offer = await Offre.findById(_id);
        if (!offer) {
            return res.status(404).send({ error: 'Offer not found' });
        }
        res.status(200).send(offer);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// GET /offres - Get all offers with optional filtering
router.get('/', GetOffresValidator, async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const filter = {};
  
    if (req.query.expediteur) {
      filter.expediteur = req.query.expediteur;
    }
    if (req.query.titre) {
      filter.titre = new RegExp(req.query.titre, 'i'); // case-insensitive regex search
    }
    if (req.query.lieu_depart) {
      filter.lieu_depart = new RegExp(req.query.lieu_depart, 'i'); // case-insensitive regex search
    }
    if (req.query.lieu_arrive) {
      filter.lieu_arrive = new RegExp(req.query.lieu_arrive, 'i'); // case-insensitive regex search
    }
    if (req.query.heure_depart) {
      filter.heure_depart = { $gte: req.query.heure_depart }; // filter offers with departure time greater than or equal to specified time
    }
    if (req.query.type) {
      filter.type = req.query.type;
    }
    if (req.query.vehicule) {
      filter.vehicule = req.query.vehicule;
    }
  
    try {
      const offres = await Offre.find(filter);
      res.json(offres);
    } catch (error) {
      next(error);
    }
  });
  
  module.exports = router;

module.exports = router;
