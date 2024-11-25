import RecipeMedia from '../models/recipe_media_model.js'

// Add media for a recipe
export const updateRecipeMediaController = async (req, res) => {
    const { recipe_id, media_id } = req.body;
    try {
        let recipeMedia = await RecipeMedia.findOne({ where: { recipe_id } });
        if (recipeMedia) {
            await recipeMedia.update(media_id);
        } else {
            recipeMedia = await RecipeMedia.create({ ...media_id, recipe_id });
        }
        res.status(200).json({ success: true, 
            message: 'Recipe media updated successfully', recipeMedia });
    } catch (error) {
        res.status(500).json({ success: false,
             message: 'Error updating recipe media', error: error.message });
    }
};
