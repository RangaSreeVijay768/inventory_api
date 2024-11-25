import RecipeIngredient from '../models/recipeIngredient_Model.js';

// Add ingredients to a recipe
export const addIngredientsController = async (req, res) => {
    const { recipe_id, ingredients } = req.body;
    try {
        const recipeIngredients = await RecipeIngredient.bulkCreate(
            ingredients.map(({ item_id, reference_qty }) => ({ recipe_id, item_id, reference_qty }))
        );
        res.status(201).json({ success: true,
             message: 'Ingredients added successfully', recipeIngredients });
    } catch (error) {
        res.status(500).json({ success: false,
             message: 'Error adding ingredients', error: error.message });
    }
};

// Get all ingredients of a recipe
export const getIngredientsByRecipeIdController = async (req, res) => {
    const { recipe_id } = req.params;
    try {
        const ingredients = await RecipeIngredient.findAll({ where: { recipe_id } });
        res.status(200).json({ success: true, ingredients });
    } catch (error) {
        res.status(500).json({ success: false,
             message: 'Error fetching ingredients', error: error.message });
    }
};

// Delete an ingredient from a recipe
export const deleteIngredientController = async (req, res) => {
    const { id } = req.params;
    try {
        const ingredient = await RecipeIngredient.findByPk(id);
        if (!ingredient) return res.status(404).json({ success: false,
             message: 'Ingredient not found' });
        await ingredient.destroy();
        res.status(200).json({ success: true, 
            message: 'Ingredient deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false,
            message: 'Error deleting ingredient', error: error.message });
    }
};
// update ingredients 

export const updateIngredientsController = async (req, res) => {
  const { recipe_id } = req.params; // Recipe ID to identify the recipe
  const { ingredients } = req.body; // Array of ingredient data

  try {
      if (!Array.isArray(ingredients) || ingredients.length === 0) {
          return res.status(400).json({
              success: false,
              message: 'Ingredients must be provided in an array.',
          });
      }

      const updatedIngredients = [];
      for (const ingredientData of ingredients) {
          const { ingredient_id, reference_qty } = ingredientData;

          const ingredient = await RecipeIngredient.findOne({
              where: {
                  recipe_id,
                  item_id: ingredient_id,
              },
          });

          if (!ingredient) {
              return res.status(404).json({
                  success: false,
                  message: `Ingredient with ID ${ingredient_id} not found in this recipe`,
              });
          }

          // Update reference quantity for the ingredient
          await ingredient.update({ reference_qty });
          updatedIngredients.push(ingredient);
      }

      res.status(200).json({
          success: true,
          message: 'Ingredients updated successfully',
          updatedIngredients,
      });
  } catch (error) {
      res.status(500).json({
          success: false,
          message: 'Error updating ingredients',
          error: error.message,
      });
  }
};