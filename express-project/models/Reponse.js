const mongoose = require("mongoose")

const reponseSchema = new mongoose.Schema({
reclamation : {
    type: mongoose.Types.ObjectId,
    ref: "Reclamation",
    required: true
},
expediteur :  {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true
},
reponse: {
    type: String , 
    required : true
}
}, {timestamps: true })

module.exports = mongoose.model("Reponse", reponseSchema) ;