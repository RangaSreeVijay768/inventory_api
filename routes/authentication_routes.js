import express from "express";
import {loginController, signupController} from "../controllers/authentication_controllers.js";
import {isAdmin, requireSignIn} from "../middlewares/authentication_middlewares.js";

const router = express.Router();

router.post("/signup", signupController);
router.post("/login", loginController);

export default router;

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: signup
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the user
 *               email:
 *                 type: string
 *                 description: Email of the user
 *               password:
 *                 type: string
 *                 description: Password for the account
 *     responses:
 *       200:
 *         description: User signed up successfully
 *       400:
 *         description: Invalid input or user already exists
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: login
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email
 *               password:
 *                 type: string
 *                 description: User's password
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token for authentication
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /updateRole:
 *   put:
 *     summary: updateUserRole (Admin only)
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []  # JWT token for authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID of the user to update
 *               role:
 *                 type: string
 *                 description: New role to assign (e.g., admin, user)
 *     responses:
 *       200:
 *         description: User role updated successfully
 *       400:
 *         description: Invalid input or unauthorized
 *       500:
 *         description: Server error
 */
