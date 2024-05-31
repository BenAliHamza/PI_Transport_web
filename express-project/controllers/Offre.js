const mongoose = require("mongoose");
const Offre = require("../models/Offre");
const Vehicule = require("../models/Vehicule");

const AddOffreController = async (req, res) => {
  try {
    const newOffer = new Offre({ ...req.body, expediteur: req.user._id });
    await newOffer.save();
    res.status(201).send(newOffer);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
}



const GetOffreController = async (req, res) => {
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
}

const GetOffresController = async (req, res, next) => {

  const filter = {};

  if (req.query.expediteur) {
    filter.expediteur = req.query.expediteur;
  }
  if (req.query.titre) {
    filter.titre = new RegExp(req.query.titre, 'i');
  }
  if (req.query.lieu_depart) {
    filter.lieu_depart = new RegExp(req.query.lieu_depart, 'i');
  }
  if (req.query.lieu_arrive) {
    filter.lieu_arrive = new RegExp(req.query.lieu_arrive, 'i');
  }
  if (req.query.heure_depart) {
    filter.heure_depart = { $gte: req.query.heure_depart };
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
}

const UpdateOffreController = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['titre', 'lieu_depart', 'lieu_arrive', 'heure_depart', 'type', 'vehicule'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const offer = await Offre.findById(req.params.id).populate("expediteur");
    if (offer.expediteur._id != req.user._id) {
      return res.status(401).send({ error: 'You Can\'t update this offer' });
    }
    if (!offer) {
      return res.status(404).send({ error: 'Offer not found' });
    }

    if (!req.vehicule) {
      var vehicule = await Vehicule.findById(vehicule);
      if(!vehicule){
        return res.status(400).send({ error: 'Vehicule not found' });
      }
    }
    const updateoffer = await Offre.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    res.send(updateoffer);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
}

module.exports = { AddOffreController, GetOffreController, GetOffresController, UpdateOffreController };
