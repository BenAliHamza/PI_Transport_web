const Reclamation = require('../models/Reclamation');

exports.createReclamation = async (req, res) => {
    try {
        const reclamation = new Reclamation(req.body);
        await reclamation.save();
        res.status(201).send(reclamation);
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
        const reclamation = await Reclamation.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!reclamation) {
            return res.status(404).send();
        }
        res.send(reclamation);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.deleteReclamation = async (req, res) => {
    try {
        const reclamation = await Reclamation.findByIdAndDelete(req.params.id);
        if (!reclamation) {
            return res.status(404).send();
        }
        res.send(reclamation);
    } catch (error) {
        res.status(500).send(error);
    }
};
