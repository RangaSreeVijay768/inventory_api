import JWT from "jsonwebtoken";
import userModel from "../models/authentication_models.js";

export const requireSignIn = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]; // Bearer <token>

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "No token provided. Please sign in."
            });
        }

        const decoded = JWT.verify(token, process.env.JWT_SECRET);

        req.user = {
            id: decoded.id,
            name: decoded.name,
            role: decoded.role,
        };

        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            success: false,
            message: "Authentication failed. Please sign in.",
        });
    }
};

export const isAdmin = async (req, res, next) => {
    try {
        const userId = req.user.id;

        const user = await userModel.findByPk(userId);

        if (user.role !== 'ROLE_ADMIN') {
            return res.status(403).json({
                success: false,
                message: "Unauthorized access. Admins only.",
            });
        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in admin middleware",
            error: error.message,
        });
    }
};
