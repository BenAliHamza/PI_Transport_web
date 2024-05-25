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
    try{
        const annonces = await Annonce.find()
        res.status(200).json(annonces)
    } catch (error) {
        res.status(500).json({ message : 'Erreur lors de l\'importation des annonces' , error : error.message})
    }
}

module.exports = {
    getAll,
    createAnnonce
}