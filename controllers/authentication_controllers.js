import userModel from "../models/authentication_models.js";
import JWT from "jsonwebtoken";
import roleModel from "../models/role_models.js";


export const signupController = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await userModel.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const newUser = await userModel.create({ name, email, password });

        const operatorRole = await roleModel.findOne({ where: { name: "operator" } });
        if (!operatorRole) {
            return res.status(500).json({ message: "Operator role not found" });
        }

        await newUser.addRole(operatorRole);

        res.status(201).send({
            success: true,
            message: "User Registered Successfully",
            newUser: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                roles: ["operator"],
            },
        });
    } catch (err) {
        return res.status(500).json({ message: "Error registering user", error: err.message });
    }
};




export const loginController = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({
            where: { email },
            include: [{
                model: roleModel,
                through: { attributes: [] }
            }]
        });

        if (!user || user.password !== password) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const roles = user.Roles.map(role => role.name);

        const token = JWT.sign(
            { id: user.id, name: user.name, roles },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.status(200).send({
            success: true,
            message: "Login successfully",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                roles,
                token,
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in login",
            error,
        });
    }
};







