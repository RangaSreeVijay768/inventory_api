import RecipeCategory from "../models/recipeCategory_model.js";

// Create a new category
export const createCategoryController = async (req, res) => {
    const { category } = req.body;
    try {

        const existingCategory = await RecipeCategory.findOne({where: { category }});
        if (existingCategory) {
            return res.status(400).json({ message: "Category  already exists" });
        }
        const categoryies = await RecipeCategory.create({ category});
        res.status(201).json({ success: true, 
            message: 'Category created successfully', categoryies });
    } catch (error) {
        res.status(500).json({ success: false, 
            message: 'Error creating category', error: error.message });
    }
};

// Get all categories
export const getAllCategoriesController = async (req, res) => {
    try {
        const categories = await RecipeCategory.findAll({});
        res.status(200).json({ success: true, categories });
    } catch (error) {
        res.status(500).json({ success: false, 
            message: 'Error fetching categories', error: error.message });
    }
};

// Get a single category by ID
export const getCategoryByIdController = async (req, res) => {
    const { id } = req.params;
    try {
        const category = await RecipeCategory.findByPk(id);
        if (!category) return res.status(404).json({ success: false,
             message: 'Category not found' });
        res.status(200).json({ success: true, category });
    } catch (error) {
        res.status(500).json({ success: false, 
            message: 'Error fetching category', error: error.message });
    }
};

// Update a category
export const updateCategoryController = async (req, res) => {
    const { id } = req.params;
    const { category } = req.body;
    try {
        const categories = await RecipeCategory.findByPk(id);
        if (!categories) return res.status(404).json({ success: false, message: 'Category not found' });
        await categories.update({category});
        res.status(200).json({ success: true, 
            message: 'Category updated successfully', categories });
    } catch (error) {
        res.status(500).json({ success: false, 
            message: 'Error updating category', error: error.message });
    }
};

// Delete a category
export const deleteCategoryController = async (req, res) => {
    const { id } = req.params;
    try {
        const category = await RecipeCategory.findByPk(id);
        if (!category) return res.status(404).json({ success: false, message: 'Category not found' });
        await category.destroy();
        res.status(200).json({ success: true,
             message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false,
             message: 'Error deleting category', error: error.message });
    }
};
