import express from 'express';
import {
    createCategoryController,
    getAllCategoriesController,
    getCategoryByIdController,
    updateCategoryController,
    deleteCategoryController,
} from '../controllers/recipe_category_controller.js';
import { requireSignIn } from "../middlewares/authentication_middlewares.js";

const router = express.Router();

// Category Routes
router.post('/category', requireSignIn, createCategoryController);
router.get('/categories', requireSignIn, getAllCategoriesController);
router.get('/category/:id', requireSignIn, getCategoryByIdController);
router.put('/category/:id', requireSignIn, updateCategoryController);
router.delete('/category/:id', requireSignIn, deleteCategoryController);

export default router;
