import roleModel from "../models/role_models.js";

export const createRoleController = async (req, res) => {
    const { name } = req.body;
    const createdby = req.user.name;

    try {
        const existingRole = await roleModel.findOne({ where: { name } });
        if (existingRole) {
            return res.status(400).json({ message: "Role already exists" });
        }

        const role = await roleModel.create({
            name,
            createdby: createdby,
            updatedby: createdby,
        });

        res.status(201).send({
            success: true,
            message: "Role Created Successfully",
            role,
        });
    } catch (err) {
        return res.status(500).json({ message: "Error creating role", error: err.message });
    }
};

export const getAllRolesController = async (req, res) => {
    try {
        const roles = await roleModel.findAll({});
        res.status(200).send({
            success: true,
            message: "All Roles List",
            roles,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while getting all roles",
        });
    }
};
