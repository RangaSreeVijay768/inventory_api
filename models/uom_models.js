import { DataTypes } from 'sequelize';
import { dbConfig } from '../config/db.js';

const uomModel = dbConfig.define('Uom', {
    uomname: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    }
}, {
    tableName: 'uom',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

export default uomModel;
