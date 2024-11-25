import inventoryModel from "../models/inventory_models.js";
import itemModel from "../models/item_models.js";
import vendorModel from "../models/vendor_models.js";
import uomModel from "../models/uom_models.js";
import invoiceModel from "../models/invoice_models.js";

export const createInventoryController = async (req, res) => {
    const {
        item_id, vendor_id, uom_id, quantity, actualquantity,
        price, received_date, cost, invoice_number
    } = req.body;
        const createdby = req.user.name;

    try {
        const itemExists = await itemModel.findByPk(item_id);
        if (!itemExists) {
            return res.status(400).json({ message: "Item not found" });
        }

        const vendorExists = await vendorModel.findByPk(vendor_id);
        if (!vendorExists) {
            return res.status(400).json({ message: "Vendor not found" });
        }

        const uomExists = await uomModel.findByPk(uom_id);
        if (!uomExists) {
            return res.status(400).json({ message: "UOM not found" });
        }

        const invoiceNumExists = await invoiceModel.findOne({where: {invoice_number}});
        if (!invoiceNumExists) {
            return res.status(400).json({ message: "invoice not found" });
        }

        const inventory = await inventoryModel.create({
            item_id, vendor_id, uom_id, quantity, actualquantity,
            price, received_date, cost, invoice_number,
            createdby: createdby,
            updatedby: createdby,
        });

        res.status(201).send({
            success: true,
            message: "Inventory created successfully",
            inventory,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error creating inventory", error: err.message });
    }
};


export const getAllInventoryController = async (req, res) => {
    try {
        const inventory = await inventoryModel.findAll({});
        res.status(200).send({
            success: true,
            message: "All inventory List",
            inventory,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while getting all inventory",
        });
    }
};


export const getInventoryByIdController = async (req, res) => {
    const { id } = req.params;

    try {
        const inventory = await inventoryModel.findByPk(id);
        
        if (!inventory) {
            return res.status(404).json({ message: "Inventory not found" });
        }

        res.status(200).send({
            success: true,
            message: "Inventory retrieved successfully",
            inventory,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error retrieving inventory", error: error.message });
    }
};


export const updateInventoryController = async (req, res) => {
    const { id } = req.params;
    const {
        item_id, vendor_id, uom_id, quantity, actualquantity,
        price, received_date, cost, invoice_number
    } = req.body;
    const updatedby = req.user.name;

    try {
        const inventory = await inventoryModel.findByPk(id);
        if (!inventory) {
            return res.status(404).json({ message: "Inventory not found" });
        }
        const itemExists = await itemModel.findByPk(item_id);
        if (!itemExists) {
            return res.status(400).json({ message: "Item not found" });
        }
        const vendorExists = await vendorModel.findByPk(vendor_id);
        if (!vendorExists) {
            return res.status(400).json({ message: "Vendor not found" });
        }
        const uomExists = await uomModel.findByPk(uom_id);
        if (!uomExists) {
            return res.status(400).json({ message: "UOM not found" });
        }
        const invoiceNumExists = await invoiceModel.findOne({ where: { invoice_number } });
        if (!invoiceNumExists) {
            return res.status(400).json({ message: "Invoice not found" });
        }

        await inventory.update({
            item_id, vendor_id, uom_id, quantity, actualquantity,
            price, received_date, cost, invoice_number,
            updatedby: updatedby, // Track who updated the inventory
        });

        res.status(200).send({
            success: true,
            message: "Inventory updated successfully",
            inventory,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error updating inventory", error: err.message });
    }
};


export const deleteInventoryController = async (req, res) => {
    const { id } = req.params;

    try {
        const existingInventory = await inventoryModel.findByPk(id);
        if (!existingInventory) {
            return res.status(404).json({ message: "Inventory not found" });
        }
        await inventoryModel.destroy({ where: { id } });

        res.status(200).send({
            success: true,
            message: "Item deleted successfully",
        });
    } catch (err) {
        return res.status(500).json({ message: "Error deleting item", error: err.message });
    }
};
