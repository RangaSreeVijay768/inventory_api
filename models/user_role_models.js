import { DataTypes } from "sequelize";
import { dbConfig } from "../config/db.js";
import userModel from "./authentication_models.js";
import roleModel from "./role_models.js";

const userRoleModel = dbConfig.define('UserRole', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: userModel,
            key: 'id',
        },
    },
    roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: roleModel,
            key: 'id',
        },
    },
}, {
    tableName: 'user_roles',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

userModel.belongsToMany(roleModel, { through: userRoleModel, foreignKey: 'userId' });
roleModel.belongsToMany(userModel, { through: userRoleModel, foreignKey: 'roleId' });

export default userRoleModel;
