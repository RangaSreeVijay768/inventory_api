import userModel from "../models/authentication_models.js";
import roleModel from "../models/role_models.js";
import userRoleModel from "../models/user_role_models.js";

export const assignRolesToUser = async (req, res) => {
    const { userId, roleIds } = req.body;

    if (!userId || !Array.isArray(roleIds) || roleIds.length === 0) {
        return res.status(400).json({ message: 'Invalid input. Please provide userId and an array of roleIds.' });
    }

    try {
        const user = await userModel.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        const roles = await roleModel.findAll({
            where: {
                id: roleIds,
            },
        });

        if (roles.length !== roleIds.length) {
            return res.status(404).json({ message: 'One or more roles not found.' });
        }
        await userRoleModel.destroy({ where: { userId } });

        const userRoles = roleIds.map((roleId) => ({
            userId: user.id,
            roleId: roleId,
        }));
        
        await userRoleModel.bulkCreate(userRoles);

        return res.status(200).json({ message: 'Roles assigned successfully.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error.', error: error.message });
    }
};
