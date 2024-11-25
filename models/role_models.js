import { DataTypes } from "sequelize";
import { dbConfig } from "../config/db.js";

const roleModel = dbConfig.define('Role', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'roles',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

export default roleModel;
