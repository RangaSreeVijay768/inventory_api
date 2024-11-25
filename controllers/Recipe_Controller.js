
import Recipe from "../models/recipe_Model.js";
import RecipeMedia from "../models/recipe_media_model.js";
import RecipeCategory from "../models/recipeCategory_model.js";

// Create a new recipe

export const createRecipeController = async (req, res) => {
    const { recipe_name, description, instructions, comments, is_lc_recipe, category_id, media } = req.body;
    try {
      const recipe = await Recipe.create({ recipe_name, description, instructions, comments, is_lc_recipe, category_id });
  
      // If media is provided, store multiple entries
      if (media && Array.isArray(media)) {
        const mediaEntries = media.map(m => ({
          recipe_id: recipe.id,
          thumbnail_url: m.thumbnail_url || null,
          image_url: m.image_url || null,
          video_url: m.video_url || null,
        }));
        await RecipeMedia.bulkCreate(mediaEntries);
      }
  
      res.status(201).json({ success: true,
         message: 'Recipe created successfully', recipe });
    } catch (error) {
      res.status(500).json({ success: false, 
        message: 'Error creating recipe', error: error.message });
    }
  };



// Get all recipes
export const getAllRecipesController = async (req, res) => {
    try {
        const recipes = await Recipe.findAll({ include: [RecipeMedia,RecipeCategory] });
        res.status(200).json({ success: true, recipes });
    } catch (error) {
        res.status(500).json({ success: false, 
          message: 'Error fetching recipes', error: error.message });
    }
};

// Get a single recipe by ID
export const getRecipeByIdController = async (req, res) => {
    const { id } = req.params;
    try {
        const recipe = await Recipe.findByPk(id, { include: [RecipeMedia,RecipeCategory] });
        if (!recipe) return res.status(404).json({ success: false, 
          message: 'Recipe not found' });
        res.status(200).json({ success: true, recipe });
    } catch (error) {
        res.status(500).json({ success: false, 
          message: 'Error fetching recipe', error: error.message });
    }
};

// Update a recipe
export const updateRecipeWithMediaController = async (req, res) => {
    const { id } = req.params; // Recipe ID
    const { recipe_name, description, instructions, comments, is_lc_recipe, category_id, media } = req.body;
  
    try {
      // Find the recipe to update
      const recipe = await Recipe.findByPk(id, { include: [RecipeMedia] });
      if (!recipe) {
        return res.status(404).json({ success: false, 
          message: 'Recipe not found' });
      }
  
      // Update recipe details
      await recipe.update({ recipe_name, description, instructions, comments, is_lc_recipe, category_id });
  
      // Update or replace media entries
      if (media && Array.isArray(media)) {
        // Delete old media entries
        await RecipeMedia.destroy({ where: { recipe_id: recipe.id } });
  
        // Create new media entries
        const mediaEntries = media.map((m) => ({
          recipe_id: recipe.id,
          thumbnail_url: m.thumbnail_url || null,
          image_url: m.image_url || null,
          video_url: m.video_url || null,
        }));
        await RecipeMedia.bulkCreate(mediaEntries);
      }
  
      res.status(200).json({ success: true, 
        message: 'Recipe and media updated successfully', recipe });
    } catch (error) {
      res.status(500).json({ success: false, 
        message: 'Error updating recipe and media', error: error.message });
    }
  };
// Delete a recipe
export const deleteRecipeWithMediaController = async (req, res) => {
    const { id } = req.params; // Recipe ID
  
    try {
      // Find the recipe to delete
      const recipe = await Recipe.findByPk(id);
      if (!recipe) {
        return res.status(404).json({ success: false, message: 'Recipe not found' });
      }
  
      // Delete associated media entries
      await RecipeMedia.destroy({ where: { recipe_id: recipe.id } });
  
      // Delete the recipe itself
      await recipe.destroy();
  
      res.status(200).json({ success: true, 
        message: 'Recipe and associated media deleted successfully' });
    } catch (error) {
      res.status(500).json({ success: false, 
        message: 'Error deleting recipe and media', error: error.message });
    }
  };
