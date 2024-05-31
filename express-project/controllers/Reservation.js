// Importation du modèle Reservation
const Reservation = require('../models/Reservation');
const Offre = require("./../models/Offre");
const Vehicule = require("../models/Vehicule")
const {sendReservationEmail  }  = require('../shared/services/transporter')

// Fonction pour créer une réservation
const createReservation = async (req, res) => {
    try {
        var placedisponible = await calculplacedisponible(req.body.offre)
        //const userId = req.user._id;
        if(placedisponible < req.body.places)
            return res.status(500).json({ message : 'Erreur lors de la création de la réservation', error : "nb de places insuffusants" })
        console.log(placedisponible);
        const reservation = new Reservation({
            ...req.body,

        })
       const createdReservation =  await Reservation.create(reservation) ;
        if(!createdReservation){
          return  res.status(404).json({
            message : "issue during creating reservation "
          })
        }
        await sendReservationEmail(req.user)
        res.status(201).json(reservation)
    } catch (error) {
        res.status(500).json({ message : 'Erreur lors de la création de la réservation', error : error.message })
    }
};

// Fonction pour obtenir toutes les réservations d'un utilisateur
const getAllReservationsByUser = async (req, res) => {
    try {
        const reservations = await Reservation.find(); // { user: req.params.userId }
        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({ message : 'Erreur lors de l\'importation des réservations', error : error.message });
    }
};


// Fonction pour obtenir toutes les réservations d'un utilisateur
const getAllReservationsByFilter = async (req, res) => {
    try {
        const filter = req.query.status
        const reservations = await Reservation.find({ status : filter}) // { user: req.params.userId }
        console.log(reservations)
        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({ message : 'Erreur lors de l\'importation des réservations', error : error.message });
    }
};

const updateReservation = async (req, res) => {
    try {
        const reservation = await Reservation.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(reservation);
    } catch (error) {
        res.status(500).json({ message : 'Erreur lors de la mise à jour de la réservation', error : error.message });
    }
};

const deleteReservation = async (req, res) => {
    try {
        await Reservation.findByIdAndRemove(req.params.id);
        res.status(200).json({ message: 'Réservation supprimée avec succès' });
    } catch (error) {
        res.status(500).json({ message : 'Erreur lors de la suppression de la réservation', error : error.message });
    }
};

// Fonction pour accepter une réservation
const acceptReservation = async (req, res) => {
    try {
        const reservation = await Reservation.findByIdAndUpdate(req.params.id, { status: 'acceptée' }, { new: true });
        res.status(200).json(reservation);
    } catch (error) {
        res.status(500).json({ message : 'Erreur lors de l\'acceptation de la réservation', error : error.message });
    }
};
// Fonction pour refuser une réservation
const refuseReservation = async (req, res) => {
    try {
        const reservation = await Reservation.findByIdAndUpdate(req.params.id, { status: 'refusé' }, { new: true });
        res.status(200).json(reservation);
    } catch (error) {
        res.status(500).json({ message : 'Erreur lors du refus de la réservation', error : error.message });
    }
};
const calculplacedisponible = async (idoffre)=> {
  try {
    // Find the offer by ID and populate the 'vehicule' field
    const offre = await Offre.findById(idoffre).populate("vehicule");
    if (!offre) {
      throw new Error('Offre not found');
    }
    // Find all reservations for the given offer
    const reservation_offre = await Reservation.find({ offre: offre._id });

    // Calculate the total reserved places
    const reserved_places = reservation_offre.reduce((total, res) => total + res.places, 0);
    // Return the available places
    return offre.vehicule.places - reserved_places;
  } catch (error) {
    console.error('Error calculating available places:', error);
    throw error;  // Rethrow the error for the caller to handle
  }

}

// Exportation de la fonction
module.exports = {
    createReservation,
    getAllReservationsByUser,
    updateReservation,
    deleteReservation,
    acceptReservation,
    refuseReservation,
    getAllReservationsByFilter
};
