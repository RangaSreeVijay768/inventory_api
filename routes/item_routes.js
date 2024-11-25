import express from "express";
import {
    createItemController, deleteItemController,
    getAllItemsByUomIdController,
    getAllItemsController, getItemByIdController, updateItemController
} from "../controllers/item_controllers.js";
import { requireSignIn } from "../middlewares/authentication_middlewares.js";

const router = express.Router();

router.post("/item", requireSignIn, createItemController);
router.get("/items", requireSignIn, getAllItemsController);
router.get("/item/:id", requireSignIn, getItemByIdController);
router.put("/item/:id", requireSignIn, updateItemController);
router.get("/items/uom/:uomid", requireSignIn, getAllItemsByUomIdController);
router.delete("/item/:id", requireSignIn, deleteItemController);

export default router;

/**
 * @swagger
 * securityDefinitions:
 *   bearerAuth:
 *     type: http
 *     scheme: bearer
 *     bearerFormat: JWT
 *
 * /item:
 *   post:
 *     summary: createItem
 *     tags: [Items]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - itemname
 *               - uomid
 *             properties:
 *               itemname:
 *                 type: string
 *               uomid:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Item created successfully
 *       400:
 *         description: Invalid input or UOM not found
 *       500:
 *         description: Server error
 */


/**
 * @swagger
 * /items:
 *   get:
 *     summary: getAllItems
 *     tags: [Items]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of items
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
 *       500:
 *         description: Server error
 */


/**
 * @swagger
 * /items/uom/{uomid}:
 *   get:
 *     summary: getAllItemsByUom
 *     tags: [Items]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uomid
 *         required: true
 *         schema:
 *           type: integer
 *         description: The UOM ID to retrieve items for
 *     responses:
 *       200:
 *         description: List of items for the specified UOM ID
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
 *       404:
 *         description: UOM not found
 *       500:
 *         description: Server error
 */


/**
 * @swagger
 * /item/{id}:
 *   put:
 *     summary: updateItem
 *     tags: [Items]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The item ID
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
 *     responses:
 *       200:
 *         description: Item updated successfully
 *       404:
 *         description: Item or UOM not found
 *       500:
 *         description: Server error
 */


/**
 * @swagger
 * /item/{id}:
 *   delete:
 *     summary: deleteItem
 *     tags: [Items]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the item to delete
 *     responses:
 *       200:
 *         description: Item deleted successfully
 *       404:
 *         description: Item not found
 *       500:
 *         description: Server error
 */
