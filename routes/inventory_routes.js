import express from "express";
import {
    createInventoryController, deleteInventoryController,
    getAllInventoryController,
    getInventoryByIdController,
    updateInventoryController
} from "../controllers/inventory_controllers.js";
import {requireSignIn} from "../middlewares/authentication_middlewares.js";

const router = express.Router();

router.post('/inventory', requireSignIn, createInventoryController);
router.get('/inventory', requireSignIn, getAllInventoryController);
router.get("/inventory/:id", requireSignIn, getInventoryByIdController);
router.put('/inventory/:id', requireSignIn, updateInventoryController);
router.delete('/inventory/:id', requireSignIn, deleteInventoryController);

export default router;

/**
 * @swagger
 * /inventory:
 *   post:
 *     summary: createInventory
 *     tags: [Inventory]
 *     security:
 *       - bearerAuth: []  # JWT token for authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - itemname
 *               - uomid
 *               - quantity
 *             properties:
 *               itemname:
 *                 type: string
 *               uomid:
 *                 type: integer
 *               quantity:
 *                 type: number
 *     responses:
 *       201:
 *         description: Inventory item created successfully
 *       400:
 *         description: Invalid input or UOM not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /inventory:
 *   get:
 *     summary: getAllInventory
 *     tags: [Inventory]
 *     security:
 *       - bearerAuth: []  # JWT token for authentication
 *     responses:
 *       200:
 *         description: A list of inventory items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   itemname:
 *                     type: string
 *                   uomid:
 *                     type: integer
 *                   quantity:
 *                     type: number
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /inventory/{id}:
 *   put:
 *     summary: updateInventory
 *     tags: [Inventory]
 *     security:
 *       - bearerAuth: []  # JWT token for authentication
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The inventory item ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               itemname:
 *                 type: string
 *               uomid:
 *                 type: integer
 *               quantity:
 *                 type: number
 *     responses:
 *       200:
 *         description: Inventory item updated successfully
 *       404:
 *         description: Inventory item or UOM not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /inventory/{id}:
 *   delete:
 *     summary: deleteInventory
 *     tags: [Inventory]
 *     security:
 *       - bearerAuth: []  # JWT token for authentication
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the inventory item to delete
 *     responses:
 *       200:
 *         description: Inventory item deleted successfully
 *       404:
 *         description: Inventory item not found
 *       500:
 *         description: Server error
 */
