
// Create Category
exports.createCategory = async (req, res) => {
    const category = new Category(req.body);
    try {
        const savedCategory = await category.save();//yestana fiha tjaweb
        res.status(201).send(savedCategory);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Get All Categories
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).send(categories);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Get  min 3and Category by ID
exports.getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).send();
        res.status(200).send(category);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update il Category
exports.updateCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!category) return res.status(404).send();
        res.status(200).send(category);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete il category
exports.deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) return res.status(404).send();
        res.status(200).send(category);
    } catch (error) {
        res.status(500).send(error);
    }
};
