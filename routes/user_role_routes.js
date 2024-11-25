import express from "express";
import { requireSignIn } from "../middlewares/authentication_middlewares.js";
import { assignRolesToUser } from "../controllers/user_role_controllers.js";

const router = express.Router();

router.post("/assign-roles", requireSignIn, assignRolesToUser);

export default router;