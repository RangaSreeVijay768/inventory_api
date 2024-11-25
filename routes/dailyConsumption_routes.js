import express from 'express';
import {
    createDailyConsumptionController,
    getAllDailyConsumptionsController,
    getDailyConsumptionByIdController,
    updateDailyConsumptionController,
    deleteDailyConsumptionController,
} from '../controllers/daily_consumption_controller.js';
import {requireSignIn} from "../middlewares/authentication_middlewares.js";

const router = express.Router();

// Create a new Daily Consumption
router.post('/daily-consumption' ,requireSignIn , createDailyConsumptionController);

// Get all Daily Consumptions
router.get('/daily-consumption' ,requireSignIn , getAllDailyConsumptionsController);

// Get a Daily Consumption by DateID;
router.get('/daily-consumption/:dateId' ,requireSignIn , getDailyConsumptionByIdController);

// Update Daily Consumption
router.put('/daily-consumption/:id' ,requireSignIn ,  updateDailyConsumptionController);

// Delete Daily Consumption
router.delete('/daily-consumption/:id' , requireSignIn , deleteDailyConsumptionController);

export default router;
