// routes/vehicule.js
const express = require('express');
const { body, param, query, validationResult } = require('express-validator');
const Vehicule = require('../models/Vehicule');
const User = require('../models/User');

const router = express.Router();

// Middleware to check if the proprietaire exists in the users collection
async function checkProprietaireExists(req, res, next) {
  const proprietaireId = req.body.proprietaire || req.query.proprietaire || req.params.proprietaire;
  if (proprietaireId) {
    const userExists = await User.findById(proprietaireId);
    if (!userExists) {
      return res.status(404).json({ error: 'Proprietaire not found' });
    }
  }
  next();
}

// Create a vehicule
router.post('/', [
  body('proprietaire').isMongoId().withMessage('Invalid proprietaire ID'),
  body('marque').isString().withMessage('Marque must be a string'),
  body('model').isString().withMessage('Model must be a string'),
  body('places').isInt({ min: 1 }).withMessage('Places must be at least 1')
], checkProprietaireExists, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const vehicule = new Vehicule(req.body);
    await vehicule.save();
    res.status(201).json(vehicule);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a vehicule
router.delete('/:id', [
  param('id').isMongoId().withMessage('Invalid vehicule ID')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const vehicule = await Vehicule.findByIdAndDelete(req.params.id);
    if (!vehicule) {
      return res.status(404).json({ error: 'Vehicule not found' });
    }
    res.status(200).json({ message: 'Vehicule deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all vehicules with optional filtering
router.get('/', [
  query('proprietaire').optional().isMongoId().withMessage('Invalid proprietaire ID'),
  query('marque').optional().isString(),
  query('model').optional().isString(),
  query('places').optional().isInt({ min: 1 })
], checkProprietaireExists, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const filter = {};
  if (req.query.proprietaire) {
    filter.proprietaire = req.query.proprietaire;
  }
  if (req.query.marque) {
    filter.marque = new RegExp(req.query.marque, 'i'); // case-insensitive regex search
  }
  if (req.query.model) {
    filter.model = new RegExp(req.query.model, 'i'); // case-insensitive regex search
  }
  if (req.query.places) {
    filter.places = req.query.places;
  }

  try {
    const vehicules = await Vehicule.find(filter);
    res.json(vehicules);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single vehicule by ID
router.get('/:id', [
  param('id').isMongoId().withMessage('Invalid vehicule ID')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const vehicule = await Vehicule.findById(req.params.id);
    if (!vehicule) {
      return res.status(404).json({ error: 'Vehicule not found' });
    }
    res.json(vehicule);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;