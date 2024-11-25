import express from "express";
import {
    createInvoiceController,
    deleteInvoiceController,
    getAllInvoicesByDateRangeController,
    getAllInvoicesByPriceRangeController,
    getAllInvoicesByVendorIdController,
    getAllInvoicesController,
    getInvoiceByIdController,
    updateInvoiceController
} from "../controllers/invoice_controllers.js";
import {requireSignIn} from "../middlewares/authentication_middlewares.js";

const router = express.Router();

router.post("/invoice", requireSignIn, createInvoiceController);
router.get("/invoices", requireSignIn, getAllInvoicesController);
router.get("/invoice/:id", requireSignIn, getInvoiceByIdController);
router.get("/invoices/vendor/:vendorid", requireSignIn, getAllInvoicesByVendorIdController);
router.get("/invoices/daterange", requireSignIn, getAllInvoicesByDateRangeController);
router.get("/invoices/pricerange", requireSignIn, getAllInvoicesByPriceRangeController);
router.put("/invoice/:id", requireSignIn, updateInvoiceController);
router.delete("/invoice/:id", requireSignIn, deleteInvoiceController);

export default router;

/**
 * @swagger
 * /invoice:
 *   post:
 *     summary: createInvoice
 *     tags: [Invoices]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - vendorid
 *               - total
 *               - date
 *             properties:
 *               vendorid:
 *                 type: integer
 *               total:
 *                 type: number
 *               date:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Invoice created successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /invoices:
 *   get:
 *     summary: getAllInvoices
 *     tags: [Invoices]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all invoices
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   vendorid:
 *                     type: integer
 *                   total:
 *                     type: number
 *                   date:
 *                     type: string
 *                     format: date
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /invoices/vendor/{vendorid}:
 *   get:
 *     summary: getAllInvoicesByVendor
 *     tags: [Invoices]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: vendorid
 *         required: true
 *         schema:
 *           type: integer
 *         description: The vendor ID
 *     responses:
 *       200:
 *         description: List of invoices by vendor ID
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   vendorid:
 *                     type: integer
 *                   total:
 *                     type: number
 *                   date:
 *                     type: string
 *                     format: date
 *       404:
 *         description: Vendor not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /invoices/daterange:
 *   get:
 *     summary: getAllInvoicesByDateRange
 *     tags: [Invoices]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: start
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date for the range
 *       - in: query
 *         name: end
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: End date for the range
 *     responses:
 *       200:
 *         description: List of invoices within the date range
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   vendorid:
 *                     type: integer
 *                   total:
 *                     type: number
 *                   date:
 *                     type: string
 *                     format: date
 *       400:
 *         description: Invalid date range
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /invoices/pricerange:
 *   get:
 *     summary: getAllInvoicesByPriceRange
 *     tags: [Invoices]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: min
 *         required: true
 *         schema:
 *           type: number
 *         description: Minimum price for the range
 *       - in: query
 *         name: max
 *         required: true
 *         schema:
 *           type: number
 *         description: Maximum price for the range
 *     responses:
 *       200:
 *         description: List of invoices within the price range
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   vendorid:
 *                     type: integer
 *                   total:
 *                     type: number
 *                   date:
 *                     type: string
 *                     format: date
 *       400:
 *         description: Invalid price range
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /invoice/{id}:
 *   put:
 *     summary: updateInvoice
 *     tags: [Invoices]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The invoice ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               vendorid:
 *                 type: integer
 *               total:
 *                 type: number
 *               date:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Invoice updated successfully
 *       404:
 *         description: Invoice not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /invoice/{id}:
 *   delete:
 *     summary: deleteInvoice
 *     tags: [Invoices]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the invoice to delete
 *     responses:
 *       200:
 *         description: Invoice deleted successfully
 *       404:
 *         description: Invoice not found
 *       500:
 *         description: Server error
 */
