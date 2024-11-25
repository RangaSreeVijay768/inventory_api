import express from "express";
import { requireSignIn } from "../middlewares/authentication_middlewares.js";
import { createRoleController, getAllRolesController } from "../controllers/role_controllers.js";

const router = express.Router();

router.post("/role", requireSignIn, createRoleController);
router.get("/roles", requireSignIn, getAllRolesController);

export default router;