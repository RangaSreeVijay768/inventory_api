import express from "express";
import {
    createUomController,
    getAllUomController,
    updateUomController,
    deleteUomController,
    getUomByIdController,
} from "../controllers/uom_controllers.js";
import {requireSignIn} from "../middlewares/authentication_middlewares.js";

const router = express.Router();

router.post("/uom", requireSignIn, createUomController);
router.get("/uoms", requireSignIn, getAllUomController);
router.get("/uom/:id", requireSignIn, getUomByIdController);
router.put("/uom/:id", requireSignIn, updateUomController);
router.delete("/uom/:id", requireSignIn, deleteUomController);

export default router;

/**
 * @swagger
 * /uom:
 *   post:
 *     summary: createUOM
 *     tags: [UOM]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: UOM created successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /uoms:
 *   get:
 *     summary: getAllUOMs
 *     tags: [UOM]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all UOMs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   uomname:
 *                     type: string
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /uom/{id}:
 *   put:
 *     summary: updateUOM
 *     tags: [UOM]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The UOM ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: UOM updated successfully
 *       404:
 *         description: UOM not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /uom/{id}:
 *   delete:
 *     summary: deleteUOM
 *     tags: [UOM]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the UOM to delete
 *     responses:
 *       200:
 *         description: UOM deleted successfully
 *       404:
 *         description: UOM not found
 *       500:
 *         description: Server error
 */
