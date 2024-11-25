import express from 'express';
import {
    createRecipeController,
    getAllRecipesController,
    getRecipeByIdController,
    updateRecipeWithMediaController,
    deleteRecipeWithMediaController,
} from '../controllers/Recipe_Controller.js';
import { requireSignIn } from "../middlewares/authentication_middlewares.js";

const router = express.Router();

// Recipe Routes
router.post('/recipe', requireSignIn, createRecipeController);
router.get('/recipes', requireSignIn, getAllRecipesController);
router.get('/recipe/:id', requireSignIn, getRecipeByIdController);
router.put('/recipe/:id', requireSignIn, updateRecipeWithMediaController);
router.delete('/recipe/:id', requireSignIn, deleteRecipeWithMediaController);

export default router;
