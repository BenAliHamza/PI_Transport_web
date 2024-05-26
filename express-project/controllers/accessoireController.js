const Accessoire = require('../models/Accessoire');
const CategorieAccessoire = require('../models/categorieAccessoire');

// Create Accessoire
exports.createAccessoire = async (req, res) => {
    const accessoire = new Accessoire(req.body);
    if (!req.body.expediteur || !req.body.description || !req.body.titre || !req.body.prix || !req.body.categorie) {
        return res.status(400).send("Veuillez remplir tous les champs");
    }
    if (typeof req.body.prix !== 'number' || req.body.prix < 0) {
        return res.status(400).send("Prix doit etre positive");
    }
    try {
        const savedAccessoire = await accessoire.save();
        res.status(201).send(savedAccessoire);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Get All Accessoires
// Get All Accessoires with Search, Filtering, and Sorting
exports.getAllAccessoires = async (req, res) => {
    try {
        let query = {};
        if (req.query.search) {
            const searchRegex = new RegExp(req.query.search, 'i');
            query = {
                $or: [
                    { titre: { $regex: searchRegex } },
                    { description: { $regex: searchRegex } }
                ]
            };
        }
        if (req.query.category) {
            query.categorie = req.query.category;
        }
        if (req.query.priceMin && req.query.priceMax) {
            query.prix = { $gte: req.query.priceMin, $lte: req.query.priceMax };
        } else if (req.query.priceMin) {
            query.prix = { $gte: req.query.priceMin };
        } else if (req.query.priceMax) {
            query.prix = { $lte: req.query.priceMax };
        }

        const sortOptions = {};
        if (req.query.sort) {
            const [sortBy, sortOrder] = req.query.sort.split(':');
            sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;
        }

        const accessoires = await Accessoire.find(query).populate('categorie').sort(sortOptions);
        res.status(200).send(accessoires);
    } catch (error) {
        res.status(500).send(error);
    }
};

//GET /accessoires?sort=prix:desc
//GET /accessoires?search=query&category=category_id&priceMin=10&priceMax=50


// Get Accessoire by ID
exports.getAccessoireById = async (req, res) => {
    try {
        const accessoire = await Accessoire.findById(req.params.id).populate('categorie');
        if (!accessoire) return res.status(404).send();
        res.status(200).send(accessoire);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update Accessoire
exports.updateAccessoire = async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).send("Veuillez modifier un champs");
    }
    if (req.body.prix && (typeof req.body.prix !== 'number' || req.body.prix < 0)) {
        return res.status(400).send("Prix doit etre positive");
    }
    try {
        const accessoire = await Accessoire.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!accessoire) return res.status(404).send();
        res.status(200).send(accessoire);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete Accessoire
exports.deleteAccessoire = async (req, res) => {
    try {
        const accessoire = await Accessoire.findByIdAndDelete(req.params.id);
        if (!accessoire) return res.status(404).send();
        res.status(200).send(accessoire);
    } catch (error) {
        res.status(500).send(error);
    }
};
