const Reclamation = require('../models/Reclamation');

exports.createReclamation = async (req, res) => {
    try {
        const userConnected = req.user ;
        const reclamation = req.body;
        console.log(userConnected._id)
        const newReclamation = await  Reclamation.create({...reclamation , expediteur : userConnected._id});
        if(!newReclamation){
          res.status(403).json({
            message : 'Erreur lors de la creation de la reclamation'
          })
        }
         res.status(201).send({
           message : "Reclamation has been created successfully",
           newReclamation : newReclamation
         });
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.getReclamations = async (req, res) => {
//GET /reclamations?search=keyword
//GET /reclamations?sortBy=createdAt:desc
//GET /reclamations?startDate=2023-01-01&endDate=2023-12-31
///reclamations?search=keyword&sortBy=createdAt:desc&startDate=2023-01-01&endDate=2023-12-31
    try {
        const { search, sortBy, startDate, endDate } = req.query;
        const match = {};
        const sort = {};

        if (search) {
            match.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        if (startDate || endDate) {
            match.createdAt = {};
            if (startDate) {
                match.createdAt.$gte = new Date(startDate);
            }
            if (endDate) {
                match.createdAt.$lte = new Date(endDate);
            }
        }

        if (sortBy) {
            const parts = sortBy.split(':');
            sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
        }

        const reclamations = await Reclamation.find(match)
            .populate('expediteur')
            .sort(sort);

        res.send(reclamations);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.getReclamationById = async (req, res) => {
    try {
        const reclamation = await Reclamation.findById(req.params.id).populate('expediteur');
        if (!reclamation) {
            return res.status(404).send();
        }
        res.send(reclamation);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.updateReclamation = async (req, res) => {
    try {
        const reclamation = await Reclamation.findById(req.params.id);
        if(!reclamation){
          return res.status(404).json({
            message :"there is no reclamation with this ID "
          });
        }
        if( req.user._id.toString()!== reclamation.expediteur.toString() ){
          if(req.user.role !== "ADMIN"){
            return  res.status(403).json({
              message : 'are not allowed to delete the reclamation '
            })
          }
        }
        const Updatedreclamation = await Reclamation.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!Updatedreclamation) {
            return res.status(404).json({
             message :"An erreur has occured during updating reclamation !!!  "
            });
        }
        res.status(200).json(
          {
            message :"relcamation has been updated !!",
            newReclamation :Updatedreclamation
          }
        );
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.deleteReclamation = async (req, res) => {
    try {
        const reclamation = await Reclamation.findByIdAndDelete(req.params.id);
        if (!reclamation) {
            return res.status(404).json({
              message : "Relcamation  is already deleted or does not exist"
            });
        }
        res.status(200).json({
          message :"Reclamation has been deleted succefully",
        });
    } catch (error) {
        res.status(500).send(error);
    }
};
