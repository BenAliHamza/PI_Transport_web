// controllers/reclamationController.js
const Reclamation = require('../models/Reclamation');
const Reponse = require('../models/Reponse');
const {sendResponseEmail} = require("../shared/services/transporter");


exports.createReponse = async (req, res) => {
  try {
    let  user = req.user;
    const reponse = req.body
    const reclamation = await Reclamation.findById(reponse.reclamation).populate("expediteur");
    if(!reclamation) {
      return res.status(404).send({
        message : `Reclamation with ID ${reponse.reclamation} does not exist`
      });
    }
    const newRes = await  Reponse.create({...reponse , expediteur : user._id})
    await Reclamation.findByIdAndUpdate(reponse.reclamation, {
      etat : "Traiter"
    })
    await  sendResponseEmail(reclamation.expediteur , newRes.reponse)
    res.status(201).send({
      message : "response has been created !", response : newRes
    });
  } catch (error) {
    res.status(400).send({
      message : error.message
    });
  }
};
exports.deleteResponse = async (req, res) => {
  try {
    const id = req.params.id;
    if(!id){
      return res.status(404).send({
        message : "ID IS REQUIRED "
      })
    }
    const response  = await Reponse.findByIdAndDelete(id);
    if (!response) {
      return res.status(404).send({
        message :"reponse does not exist or has been deleted"
      });
    }
    res.status(200).json({
      message :"Response has been deleted successfully",
    });
  } catch (error) {
    res.status(500).send({
      message  :error.message
    });
  }
};
exports.getReponses = async (req, res) => {
  try {
    const reclamations = await Reponse.find().populate(["reclamation", "expediteur"]);
    res.send(reclamations);
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.getReponse = async (req, res) => {
    try {
        const response  = await Reponse.findById(req.params.id).populate(["reclamation", "expediteur"]);
        if (!response) {
            return res.status(404).send({
              message :"no response with this ID"
            });
        }
        res.send(response);
    } catch (error) {
        res.status(500).send(error);
    }
};
exports.updateReponse = async (req, res) => {
    try {
        const response = await Reponse.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!response) {
            return res.status(404).send({
              message :"Response id is not valid"
            });
        }
        res.send(response);
    } catch (error) {
        res.status(400).send(error);
    }
};


// controllers/reponseController.js


