// routes
// Importation des modules nécessaires

const express = require('express');

const router = express.Router();
 
// Importation du contrôleur

const { createReservation, getAllReservationsByUser, getAllReservationsByFilter, updateReservation, deleteReservation, acceptReservation, refuseReservation } = require('../controllers/Reservation');
 
// Route pour créer une réservation

router.post('/', createReservation); // à ajouter :offreID
 
// Route pour obtenir toutes les réservations d'un utilisateur

router.get('/', getAllReservationsByUser);// :userId


router.get('/filter', getAllReservationsByFilter); // :userId
 
// Route pour mettre à jour une réservation

router.put('/:id', updateReservation);
 
// Route pour supprimer une réservation

router.delete('/:id', deleteReservation);
 
// Route pour accepter une réservation

router.put('/accept/:id', acceptReservation);
 
// Route pour refuser une réservation

router.put('/refuse/:id', refuseReservation);
 
// Exportation du routeur

module.exports = router;











//endpoints pour le demandeur
/// Create /:IDOFFREE  $req.user._id$

// getAll reservation $admin$    //// getallbyUser Idoffre $req.user._id$

// getbyID one 

// update 

// delete 




// endpoints pour l'offreur 
// getallReservation_IDoffre pour une offre 
// getoonebyID 
// put req.reservation ===> accepter 
//  put reservation ===> refuser

