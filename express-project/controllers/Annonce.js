const Annonce = require('../models/Annonce')
const {sendAnnonceEmail  }  = require('../shared/services/transporter')

 const createAnnonce = async (req, res) => {
    try {
        let  annonce  =  req.body ;
      // Populate the user details
        const annonceCreated = await  Annonce.create({...annonce ,  user_Id : req.user._id });
        await sendAnnonceEmail(req.user)
        res.status(201).json(annonceCreated)
    }catch (error){
        res.status(500).json({ message : 'Erreur lors de la creation de l\'annonce' , error : error.message})
    }
}
const getAll = async (req, res) => {
    try {
        const { status } = req.query;
        const filter = status ? { status } : {};
        const annonces = await Annonce.find(filter).populate('user_Id');
        res.status(200).json(annonces)
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de l\'importation des annonces', error: error.message })
    }
}
const getById = async (req, res) => {
    try{
        const annonce = await Annonce.findById(req.params.id).populate('user_Id');
        if(!annonce) {
         return  res.status(404).json({
            message : "Annonced Id is wrong !"
          })
        }
        res.status(200).json(annonce)
    } catch (error) {
        res.status(500).json({ message : 'Erreur lors de l\'importation des annonces' , error : error.message})
    }
}
const updateAnnonce = async (req, res) => {
    try {

        const oldAnnonce = await Annonce.findById(req.params.id);
        if( !oldAnnonce ) {
          return res.status(404).json({
            message : "Annonce is not valid or has been deleted "
          })
        }

        const annonce = await Annonce.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if(!annonce){
          return res.status(500).json({
            message :"Erreur lors de mise à jour de  l'annonce",
          })
        }
        res.status(200).json( {
          message : "new Annonce has been updated " ,
          newAnnonce : annonce
        });
    } catch (error) {
        res.status(500).json({ message : 'Erreur lors de la mise à jour de l\'annonce', error : error.message });
    }
};
const deleteAnnonce = async (req, res) => {
    try {
        const annonce = await Annonce.findById(req.params.id);
        if(!annonce) {
          return res.status(404).json({
            message : "Annonce is not valid or has been deleted "
          })
        }
        await Annonce.findByIdAndRemove(req.params.id);
        res.status(200).json({ message: 'Annonce supprimée avec succès' });
    } catch (error) {
        res.status(500).json({ message : 'Erreur lors de la suppression de l\'annonce', error : error.message });
    }
};
module.exports = {
    getAll,
    createAnnonce,
    getById,
    updateAnnonce,
    deleteAnnonce
};
