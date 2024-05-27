// Importation du modèle Reservation
const Reservation = require('../models/Reservation');
const Offre = require("./../models/Offre");
const Vehicule = require("../models/Vehicule")
 
// Fonction pour créer une réservation
const createReservation = async (req, res) => {
    try {
        var offre = await Offre.findById(req.body.offre).populate("vehicule");
        var reservation_offre = await Reservation.find({offre : offre._id});
        var reserved_places =  reservation_offre.reduce((totale, res) => totale + res.places, 0);
        if(req.body.places + reserved_places > offre.vehicule.places){
                throw new Error('Nombre De places insuffisant')
        }
        const reservation = new Reservation({
            ...req.body,
            //offre : req.params.offreID
            //user : req.user.id    // récupérer l'id de l'utilisateur qui fait la réservation
        })
        await reservation.save()
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

 
// Exportation de la fonction
module.exports = {
    createReservation,
    getAllReservationsByUser,
    updateReservation,
    deleteReservation,
    acceptReservation,
    refuseReservation
};