import { DataTypes } from 'sequelize';
import { dbConfig } from '../config/db.js';

const invoiceModel = dbConfig.define('Invoice', {
    invoice_number: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    vendor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'vendors',
            key: 'id'
        }
    },
    invoice_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    received_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    waybill_number: {
        type: DataTypes.STRING,
    },
    vehicle_number: {
        type: DataTypes.STRING,
    },
    received_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    cgst: {
        type: DataTypes.FLOAT,
        defaultValue: 0.0,
    },
    sgst: {
        type: DataTypes.FLOAT,
        defaultValue: 0.0,
    },
    gst: {
        type: DataTypes.FLOAT,
        defaultValue: 0.0,
    },
    total_amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
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
    tableName: 'invoices',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});


export default invoiceModel;
