const Reponse = require("./../models/Reponse")

const getReponses= async (req,res) => {
    var rec = new Reponse({
        expediteur: '',
        reponse: 'Nécessaire fait'
    })
    await rec.save();
    var listeReponses = await Reponse.find();
    return res.send(listeReponses);
}

module.exports = { getReponses }