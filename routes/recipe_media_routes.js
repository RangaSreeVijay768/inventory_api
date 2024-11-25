import express from 'express';
import { updateRecipeMediaController } from '../controllers/recipe_media_controller.js';
import { requireSignIn } from "../middlewares/authentication_middlewares.js";

const router = express.Router();

// Recipe Media Routes
router.put('/recipe/media', requireSignIn, updateRecipeMediaController);

export default router;
