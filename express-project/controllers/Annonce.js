const Annonce = require('../models/Annonce')


 const createAnnonce = async (req, res) => {
    try {
        const annonce = new Annonce({
            ...req.body,
            //user : req.user.id    // recuperer l'id de l'utilisateur qui post l'annonce
        })
        await annonce.save()
        res.status(201).json(annonce)
    }catch (error){
        res.status(500).json({ message : 'Erreur lors de la creation de l\'annonce' , error : error.message})
    }
}

const getAll = async (req, res) => {
    try {
        const { status } = req.query;
        const filter = status ? { status } : {};
        const annonces = await Annonce.find(filter)
        res.status(200).json(annonces)
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de l\'importation des annonces', error: error.message })
    }
    /*
    Get all active annonces: GET /?status=active
    Get all draft annonces: GET /?status=draft
    Get all archived annonces: GET /?status=archived 
    */
}

const getById = async (req, res) => {
    try{
        const annonce = await Annonce.findById(req.params.id)
        res.status(200).json(annonce)
    } catch (error) {
        res.status(500).json({ message : 'Erreur lors de l\'importation des annonces' , error : error.message})
    }
}

const updateAnnonce = async (req, res) => {
    try {
        const annonce = await Annonce.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(annonce);
    } catch (error) {
        res.status(500).json({ message : 'Erreur lors de la mise à jour de l\'annonce', error : error.message });
    }
};const deleteAnnonce = async (req, res) => {
    try {
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