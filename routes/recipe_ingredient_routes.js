import express from 'express';
import {
    addIngredientsController,
    getIngredientsByRecipeIdController,
    deleteIngredientController,
    updateIngredientsController,
} from '../controllers/recipe_ingredient_controller.js';
import { requireSignIn } from "../middlewares/authentication_middlewares.js";

const router = express.Router();

// Recipe Ingredient Routes
router.post('/ingredient', requireSignIn, addIngredientsController);
router.get('/ingredient/:recipe_id', requireSignIn, getIngredientsByRecipeIdController);
router.delete('/ingredient/:id', requireSignIn, deleteIngredientController);
router.put('/ingredient/:recipe_id', requireSignIn, updateIngredientsController); 

export default router;
