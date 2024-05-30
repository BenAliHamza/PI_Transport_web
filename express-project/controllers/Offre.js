const mongoose = require("mongoose"); 
const Offre = require("../models/Offre");


const AddOffre =  async (req,res) => {
   var input = req.body;
   //add validation

   var created_offre= new Offre(input); 
   await created_offre.save();
   return res.sendStatus(201).json(created_offre);
}