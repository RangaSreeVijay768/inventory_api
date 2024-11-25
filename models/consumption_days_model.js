import { DataTypes } from 'sequelize';
import { dbConfig } from '../config/db.js';

const consumptionDaysModel = dbConfig.define('ConsumptionDays', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    adults_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    children_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'consumption_days',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

export default consumptionDaysModel;
