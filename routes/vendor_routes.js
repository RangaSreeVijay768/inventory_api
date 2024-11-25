import express from "express";
import {
    createVendorController,
    deleteVendorController,
    getAllVendorsController,
    getVendorByIdController,
    updateVendorController
} from "../controllers/vendor_controllers.js";
import {requireSignIn} from "../middlewares/authentication_middlewares.js";

const router = express.Router();

router.post("/vendor", requireSignIn, createVendorController);
router.get("/vendors", requireSignIn, getAllVendorsController);
router.get("/vendor/:id", requireSignIn, getVendorByIdController);
router.put("/vendor/:id", requireSignIn, updateVendorController);
router.delete("/vendor/:id", requireSignIn, deleteVendorController);

export default router;

/**
 * @swagger
 * /vendor:
 *   post:
 *     summary: Create a new vendor
 *     tags: [Vendor]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - vendorname
 *               - address
 *               - city
 *               - state
 *               - country
 *               - pincode
 *               - gstnumber
 *               - contactnumber
 *               - email
 *               - altcontactnumber
 *             properties:
 *               vendorname:
 *                 type: string
 *                 example: "ABC Supplies"
 *               address:
 *                 type: string
 *                 example: "123 Supply St."
 *               city:
 *                 type: string
 *                 example: "Kadapa"
 *               state:
 *                 type: string
 *                 example: "Andhra Pradesh"
 *               country:
 *                 type: string
 *                 example: "India"
 *               pincode:
 *                 type: integer
 *                 example: 12345
 *               gstnumber:
 *                 type: string
 *                 example: "GST123456789"
 *               contactnumber:
 *                 type: string
 *                 example: "234567890"
 *               email:
 *                 type: string
 *                 example: "contact@abcdsupplies.com"
 *               altcontactnumber:
 *                 type: string
 *                 example: "987654321"
 *     responses:
 *       201:
 *         description: Vendor created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Vendor Created Successfully"
 *                 vendor:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     vendorname:
 *                       type: string
 *                     address:
 *                       type: string
 *                     city:
 *                       type: string
 *                     state:
 *                       type: string
 *                     country:
 *                       type: string
 *                     pincode:
 *                       type: integer
 *                     gstnumber:
 *                       type: string
 *                     contactnumber:
 *                       type: string
 *                     email:
 *                       type: string
 *                     altcontactnumber:
 *                       type: string
 *                     createdby:
 *                       type: string
 *                     updatedby:
 *                       type: string
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                     updated_at:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /vendors:
 *   get:
 *     summary: Get all vendors
 *     tags: [Vendor]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all vendors
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "All Vendors List"
 *                 vendor:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       vendorname:
 *                         type: string
 *                       address:
 *                         type: string
 *                       city:
 *                         type: string
 *                       state:
 *                         type: string
 *                       country:
 *                         type: string
 *                       pincode:
 *                         type: integer
 *                       gstnumber:
 *                         type: string
 *                       contactnumber:
 *                         type: string
 *                       email:
 *                         type: string
 *                       altcontactnumber:
 *                         type: string
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /vendor/{id}:
 *   get:
 *     summary: Get vendor by ID
 *     tags: [Vendor]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The Vendor ID
 *     responses:
 *       200:
 *         description: Vendor retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Vendor retrieved successfully"
 *                 vendor:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     vendorname:
 *                       type: string
 *                     address:
 *                       type: string
 *                     city:
 *                       type: string
 *                     state:
 *                       type: string
 *                     country:
 *                       type: string
 *                     pincode:
 *                       type: integer
 *                     gstnumber:
 *                       type: string
 *                     contactnumber:
 *                       type: string
 *                     email:
 *                       type: string
 *                     altcontactnumber:
 *                       type: string
 *                     createdby:
 *                       type: string
 *                     updatedby:
 *                       type: string
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                     updated_at:
 *                       type: string
 *                       format: date-time
 *       404:
 *         description: Vendor not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /vendor/{id}:
 *   put:
 *     summary: Update vendor
 *     tags: [Vendor]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The Vendor ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               vendorname:
 *                 type: string
 *                 example: "XYZ Supplies"
 *               address:
 *                 type: string
 *                 example: "456 Supply Ave."
 *               city:
 *                 type: string
 *                 example: "Kadapa"
 *               state:
 *                 type: string
 *                 example: "Andhra Pradesh"
 *               country:
 *                 type: string
 *                 example: "India"
 *               pincode:
 *                 type: integer
 *                 example: 12345
 *               gstnumber:
 *                 type: string
 *                 example: "GST987654321"
 *               contactnumber:
 *                 type: string
 *                 example: "987654321"
 *               altcontactnumber:
 *                 type: string
 *                 example: "123456789"
 *     responses:
 *       200:
 *         description: Vendor updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Vendor updated successfully"
 *                 vendor:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     vendorname:
 *                       type: string
 *                     address:
 *                       type: string
 *                     city:
 *                       type: string
 *                     state:
 *                       type: string
 *                     country:
 *                       type: string
 *                     pincode:
 *                       type: integer
 *                     gstnumber:
 *                       type: string
 *                     contactnumber:
 *                       type: string
 *                     email:
 *                       type: string
 *                     altcontactnumber:
 *                       type: string
 *                     createdby:
 *                       type: string
 *                     updatedby:
 *                       type: string
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                     updated_at:
 *                       type: string
 *                       format: date-time
 *       404:
 *         description: Vendor not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /vendor/{id}:
 *   delete:
 *     summary: Delete vendor
 *     tags: [Vendor]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the vendor to delete
 *     responses:
 *       200:
 *         description: Vendor deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Vendor deleted successfully"
 *       404:
 *         description: Vendor not found
 *       500:
 *         description: Server error
 */
