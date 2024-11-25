import { DataTypes } from 'sequelize';
import { dbConfig } from '../config/db.js';
import itemModel from './item_models.js';
import consumptionDaysModel from './consumption_days_model.js';
import uomModel from './uom_models.js';

const dailyConsumptionModel = dbConfig.define('DailyConsumption', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    } ,
    item_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: itemModel,
            key: 'id',
        },
    },
    quantity: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.0,
    },
    consumption_day: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: consumptionDaysModel,
            key: 'id',
        },
    },
    UOM_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: uomModel,
            key: 'id',
        },
    },
}, {
    tableName: 'daily_consumptions',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});


dailyConsumptionModel.belongsTo(itemModel, { foreignKey: 'item_id' });
itemModel.hasMany(dailyConsumptionModel, { foreignKey: 'item_id' });

dailyConsumptionModel.belongsTo(consumptionDaysModel, { foreignKey: 'consumption_day' });
consumptionDaysModel.hasMany(dailyConsumptionModel, { foreignKey: 'consumption_day' });

dailyConsumptionModel.belongsTo(uomModel, { foreignKey: 'UOM_id' });
uomModel.hasMany(dailyConsumptionModel, { foreignKey: 'UOM_id' });

export default dailyConsumptionModel;
