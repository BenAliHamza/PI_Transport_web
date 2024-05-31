// routes
// Importation des modules nécessaires

const express = require('express');

const router = express.Router();

// Importation du contrôleur

const { createReservation, getAllReservationsByUser, getAllReservationsByFilter, updateReservation, deleteReservation, acceptReservation, refuseReservation } = require('../controllers/Reservation');
const { verifyToken } = require('../middlewares/auth');

// Route pour créer une réservation

router.post('/',verifyToken  ,createReservation); // à ajouter :offreID

// Route pour obtenir toutes les réservations d'un utilisateur

router.get('/',verifyToken  , getAllReservationsByUser);// :userId


router.get('/filter', verifyToken  ,getAllReservationsByFilter); // :userId

// Route pour mettre à jour une réservation

router.put('/:id',verifyToken  , updateReservation);

// Route pour supprimer une réservation

router.delete('/:id',verifyToken  , deleteReservation);

// Route pour accepter une réservation

router.put('/accept/:id',verifyToken  , acceptReservation);

// Route pour refuser une réservation

router.put('/refuse/:id', verifyToken  ,refuseReservation);

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

