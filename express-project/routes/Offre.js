const express = require('express');
const { body, param , validationResult } = require('express-validator');
const router = express.Router();
const Offre = require('../models/Offre'); // Adjust the path as needed

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
    [
        body('expediteur')
            .notEmpty().withMessage('Expediteur is required')
            .isMongoId().withMessage('Expediteur must be a valid ObjectId'),
        body('titre')
            .notEmpty().withMessage('Title is required')
            .isLength({ min: 3 }).withMessage('Title must be at least 3 characters long'),
        body('lieu_depart')
            .notEmpty().withMessage('Departure location is required'),
        body('lieu_arrive')
            .notEmpty().withMessage('Arrival location is required'),
        body('heure_depart')
            .notEmpty().withMessage('Departure time is required')
            .isISO8601().withMessage('Departure time must be a valid date')
            .custom((value) => {
                if (new Date(value) <= Date.now()) {
                    throw new Error('Departure time must be in the future');
                }
                return true;
            }),
        body('type')
            .notEmpty().withMessage('Type is required')
            .isIn(['Co-Voiturage', 'Livraison', 'Taxi']).withMessage('Type must be one of Co-Voiturage, Livraison, Taxi'),
        body('Vehicule')
            .notEmpty().withMessage('Vehicule is required')
            .isMongoId().withMessage('Vehicule must be a valid ObjectId')
    ],
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
    [
        body('titre')
            .optional()
            .isLength({ min: 3 }).withMessage('Title must be at least 3 characters long'),
        body('lieu_depart')
            .optional()
            .notEmpty().withMessage('Departure location is required'),
        body('lieu_arrive')
            .optional()
            .notEmpty().withMessage('Arrival location is required'),
        body('heure_depart')
            .optional()
            .isISO8601().withMessage('Departure time must be a valid date')
            .custom((value) => {
                if (new Date(value) <= Date.now()) {
                    throw new Error('Departure time must be in the future');
                }
                return true;
            }),
        body('type')
            .optional()
            .isIn(['Co-Voiturage', 'Livraison', 'Taxi']).withMessage('Type must be one of Co-Voiturage, Livraison, Taxi'),
        body('Vehicule')
            .optional()
            .isMongoId().withMessage('Vehicule must be a valid ObjectId')
    ],
    validate,
    async (req, res) => {
        const updates = Object.keys(req.body);
        const allowedUpdates = ['titre', 'lieu_depart', 'lieu_arrive', 'heure_depart', 'type', 'Vehicule'];
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

router.get('/:id', [ 
    param('id').isMongoId().withMessage('Invalid Offer Id')
], async (req, res) => {
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

router.get('/', async (req, res) => {
    try {
        const offers = await Offre.find();
        res.status(200).send(offers);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

module.exports = router;