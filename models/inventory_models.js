import {dbConfig} from "../config/db.js";
import {DataTypes} from "sequelize";
import itemModel from "./item_models.js";
import vendorModel from "./vendor_models.js";
import uomModel from "./uom_models.js";
import invoiceModel from "./invoice_models.js";

const inventoryModel = dbConfig.define('Inventory', {
    item_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: itemModel,
            key: 'id',
        },
    },
    vendor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: vendorModel,
            key: 'id',
        },
    },
    uom_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: uomModel,
            key: 'id',
        },
    },
    quantity: {
        type: DataTypes.FLOAT,
        defaultValue: 0.0,
    },
    actualquantity: {
        type: DataTypes.FLOAT,
        defaultValue: 0.0,
    },
    price: {
        type: DataTypes.FLOAT,
        defaultValue: 0.0,
    },
    received_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    cost: {
        type: DataTypes.FLOAT,
        defaultValue: 0.0,
    },
    invoice_number: {
        type: DataTypes.STRING(255),
        allowNull: false,
        references: {
            model: invoiceModel,
            key: 'invoice_number'
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
    tableName: 'inventory',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});


export default inventoryModel;
