import express from "express";
import { exportToCSVController, importFromCSVController } from "../controllers/csv_controllers.js";
import { requireSignIn } from "../middlewares/authentication_middlewares.js";
import multer from 'multer';

const router = express.Router();

const upload = multer();

router.post('/exportcsv', requireSignIn, exportToCSVController);
router.post('/importcsv', requireSignIn, upload.single('file'), importFromCSVController);

export default router;

/**
 * @swagger
 * /exportcsv:
 *   post:
 *     summary: exportToCSV
 *     tags: [CSV]
 *     security:
 *       - bearerAuth: []  # JWT token for authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               modelName:
 *                 type: string
 *                 description: The name of the model to export (e.g., item, uom, vendor, etc.)
 *               fields:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: The fields to include in the exported CSV file
 *     responses:
 *       200:
 *         description: CSV file exported successfully
 *         content:
 *           text/csv:
 *             schema:
 *               type: string
 *       400:
 *         description: Invalid input or model not found
 *       500:
 *         description: Server error
 */
