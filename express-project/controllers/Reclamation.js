const Reclamation = require("./../models/Reclamation")

const getReclamations= async (req,res) => {
     //var rec = new Reclamation({
     //    expediteur: '664f97e3db03a9822d7ee8bc',
     //    titre: 'titre',
     //    type: 'Retard'
     //})
     await rec.save();
var listeReclamations = await Reclamation.find();
return res.send(listeReclamations);
}

module.exports = { getReclamations }