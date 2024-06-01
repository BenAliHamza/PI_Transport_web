var Vehicule = require('../models/Vehicule')


const AddVehiculeController = async (req, res) => {
  try {
    const vehicule = new Vehicule({...req.body,proprietaire: req.user._id});
    await vehicule.save();
    res.status(201).json(vehicule);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const GetVehiculeController = async (req, res) => {
  try {
    const vehicule = await Vehicule.findById(req.params.id);
    if (!vehicule) {
      return res.status(404).json({ error: 'Vehicule not found' });
    }
    res.json(vehicule);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const GetVehiculesController =  async (req, res) => {

  const filter = {};
  if (req.query.proprietaire) {
    filter.proprietaire = req.query.proprietaire;
  }
  if (req.query.marque) {
    filter.marque = new RegExp(req.query.marque, 'i');
  }
  if (req.query.model) {
    filter.model = new RegExp(req.query.model, 'i');
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
}

const UpdateVehiculeController = async (req, res) => { 
  const allowedUpdates = ['proprietaire', 'marque', 'model', 'places'];
  const updates = Object.keys(req.body);
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).json({ error: 'Invalid updates!' });
  }

  try {
    const vehicule = await Vehicule.findById(req.params.id);
    if (!vehicule) {
      return res.status(404).json({ error: 'Vehicule not found' });
    }

    updates.forEach(update => vehicule[update] = req.body[update]);
    await vehicule.save();

    res.json(vehicule);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const DeleteVehiculeController = async (req, res) => {
  try {
    const vehicule = await Vehicule.findByIdAndDelete(req.params.id);
    if (!vehicule) {
      return res.status(404).json({ error: 'Vehicule not found' });
    }
    if (vehicule.proprietaire.toString() != req.user._id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    res.status(200).json({ message: 'Vehicule deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {AddVehiculeController , GetVehiculesController , UpdateVehiculeController , DeleteVehiculeController, GetVehiculeController}
