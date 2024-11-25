import express from 'express';
import {
    createConsumptionDayController,
    getAllConsumptionDaysController,
    getConsumptionDayByIdController,
    updateConsumptionDayController,
    deleteConsumptionDayController,
} from '../controllers/consumption_days_controller.js';
import {requireSignIn} from "../middlewares/authentication_middlewares.js";

const router = express.Router();

// Create a new Consumption Day
router.post('/consumption-days',requireSignIn, createConsumptionDayController);

// Get all Consumption Days
 router.get('/consumption-days',requireSignIn,getAllConsumptionDaysController);
// Get a Consumption Day by ID
router.get('/consumption-days/:id',requireSignIn, getConsumptionDayByIdController);

// Update Consumption Day
router.put('/consumption-days/:id',requireSignIn, updateConsumptionDayController);

// Delete Consumption Day
router.delete('/consumption-days/:id',requireSignIn , deleteConsumptionDayController);

export default router;
