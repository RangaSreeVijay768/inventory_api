import uomModel from "../models/uom_models.js";
import itemModel from "../models/item_models.js";

export const createItemController = async (req, res) => {
    const { itemname, uomid } = req.body;
    const createdby = req.user.name;

    try {
        const existingItem = await itemModel.findOne({ where: { itemname } });
        if (existingItem) {
            return res.status(400).json({ message: "Item already exists" });
        }

        const existingUOM = await uomModel.findByPk(uomid);
        if (!existingUOM) {
            return res.status(400).json({ message: "UOM does not exist" });
        }

        const item = await itemModel.create({ itemname, uomid,
            createdby: createdby,
            updatedby: createdby,
        });

        res.status(201).send({
            success: true,
            message: "Item Created Successfully",
            item,
        });
    } catch (err) {
        return res.status(500).json({ message: "Error creating item", error: err.message });
    }
};



export const getAllItemsController = async (req, res) => {
    try {
        const items = await itemModel.findAll({});
        res.status(200).send({
            success: true,
            message: "All Items List",
            items,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while getting all items",
        });
    }
};


export const getItemByIdController = async (req, res) => {
    const { id } = req.params;

    try {
        const item = await itemModel.findByPk(id);
        
        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }

        res.status(200).send({
            success: true,
            message: "Item retrieved successfully",
            item,
        });
    } catch (err) {
        return res.status(500).json({ message: "Error retrieving item", error: err.message });
    }
};


export const getAllItemsByUomIdController = async (req, res) => {
    const { uomid } = req.params;

    try {
        const uom = await uomModel.findByPk(uomid);
        if (!uom) {
            return res.status(404).json({ message: "UOM not found" });
        }

        const items = await itemModel.findAll({ where: { uomid } });

        res.status(200).send({
            success: true,
            message: `All items for UOM ID: ${uomid}`,
            items,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while getting items by UOM ID",
        });
    }
};



export const updateItemController = async (req, res) => {
    const { id } = req.params;
    const { itemname, uomid } = req.body;
    const updatedby = req.user.name;

    try {
        const existingItem = await itemModel.findByPk(id);
        if (!existingItem) {
            return res.status(404).json({ message: "Item not found" });
        }

        const existingUOM = await uomModel.findByPk(uomid);
        if (!existingUOM) {
            return res.status(400).json({ message: "UOM does not exist" });
        }

        await itemModel.update(
            {
                itemname,
                uomid,
                updatedby: updatedby
            },
            { where: { id } }
        );

        const updatedItem = await itemModel.findByPk(id);

        res.status(200).send({
            success: true,
            message: "Item updated successfully",
            item: updatedItem,
        });
    } catch (err) {
        return res.status(500).json({ message: "Error updating item", error: err.message });
    }
};



export const deleteItemController = async (req, res) => {
    const { id } = req.params;

    try {
        const existingItem = await itemModel.findByPk(id);
        if (!existingItem) {
            return res.status(404).json({ message: "Item not found" });
        }
        await itemModel.destroy({ where: { id } });

        res.status(200).send({
            success: true,
            message: "Item deleted successfully",
        });
    } catch (err) {
        return res.status(500).json({ message: "Error deleting item", error: err.message });
    }
};