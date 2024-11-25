import { DataTypes } from 'sequelize';
import { dbConfig } from '../config/db.js';
import invoiceModel from "./invoice_models.js";

const vendorModel = dbConfig.define('Vendor', {
    vendorname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    pincode: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    gstnumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    contactnumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    altcontactnumber: {
        type: DataTypes.STRING,
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
    tableName: 'vendors',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});


export default vendorModel;
