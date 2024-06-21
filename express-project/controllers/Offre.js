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
const ConsulterOffresController = async (req, res) => {
  const _id = req.user._id;
  try {
    const offer = await Offre.find({expediteur : _id });
    if (!offer) {
      return res.status(404).send({ error: 'Offer not found' });
    }
    res.status(200).send(offer);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}
const GetOffresController = async (req, res, next) => {

  const { heure_depart, ville_depart, adresse_depart, ville_arrive, adresse_arrive, type } = req.query;

    const filter = {};

    if (ville_depart) {
      filter['lieu_depart.ville'] = new RegExp(ville_depart, 'i');
    }
    if (adresse_depart) {
      filter['lieu_depart.adresse'] = new RegExp(adresse_depart, 'i');
    }
    if (ville_arrive) {
      filter['lieu_arrive.ville'] = new RegExp(ville_arrive, 'i');
    }
    if (adresse_arrive) {
      filter['lieu_arrive.adresse'] = new RegExp(adresse_arrive, 'i');
    }

    if (req.query.heure_depart) {
      filter.heure_depart = { $gte: heure_depart };
    }
    if (type) {
      filter.type = type;
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
    const offer = await Offre.findById(req.params.id);
    if (offer.expediteur.toString() != req.user._id.toString() && req.user.role != "ADMIN") {
      return res.status(401).send({ error: 'You Can\'t update this offer' });
    }
    if (!offer) {
      return res.status(404).send({ error: 'Offer not found' });
    }

    if (req.vehicule) {
      var vehicule = await Vehicule.findById(vehicule);
      if(!vehicule){
        return res.status(400).send({ error: 'Vehicule not found' });
      }
    }
    const updateoffer = await Offre.findByIdAndUpdate(req.params.id, req.body);
    const updatedOffer = await Offre.findById(offer._id);
    res.send(updatedOffer);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
}


const DeleteOffreController = async (req, res) => {
  try {
    const { id } = req.params;

    const offre = await Offre.findById(id);
    if (!offre) {
      return res.status(404).json({ message: 'Offer not found' });
    }
  console.log(req.user.role);
    if(offre.expediteur.toString() != req.user._id && req.user.role != "ADMIN")
      {
        return res.status(401).json({ message: 'Unauthorized To Make This Operation' });

      }

    await Offre.findByIdAndDelete(id);

    res.status(200).json({ message: 'Offer deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}



module.exports = { AddOffreController, GetOffreController, GetOffresController, ConsulterOffresController ,DeleteOffreController, UpdateOffreController };
