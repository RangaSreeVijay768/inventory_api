import { DataTypes } from 'sequelize';
import { dbConfig } from '../config/db.js';
import uomModel from "./uom_models.js";

const itemModel = dbConfig.define('Item', {
    itemname: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    uomid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: uomModel,
            key: 'id',
        }
    },
    createdby: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    updatedby: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'items',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

export default itemModel;
