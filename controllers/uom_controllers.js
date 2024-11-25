import uomModel from "../models/uom_models.js";

export const createUomController = async (req, res) => {
    const { uomname } = req.body;
    const createdby = req.user.name;

    try {
        const existingUom = await uomModel.findOne({where: { uomname }});
        if (existingUom) {
            return res.status(400).json({ message: "Uom already exists" });
        }

        const uom = await uomModel.create({ uomname,
            createdby: createdby,
            updatedby: createdby,
        });

        res.status(201).send({
            success: true,
            message: "Uom Created Successfully",
            uom,
        });
    } catch (err) {
        return res.status(500).json({ message: "Error creating uom", error: err.message });
    }
};


export const getAllUomController = async (req, res) => {
    try {
        const uom = await uomModel.findAll({});
        res.status(200).send({
            success: true,
            message: "All Uoms List",
            uom,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while getting all uoms",
        });
    }
};


export const getUomByIdController = async (req, res) => {
    const { id } = req.params;

    try {
        const uom = await uomModel.findByPk(id);
        
        if (!uom) {
            return res.status(404).json({ message: "Uom not found" });
        }

        res.status(200).send({
            success: true,
            message: "Uom retrieved successfully",
            uom,
        });
    } catch (err) {
        return res.status(500).json({ message: "Error retrieving uom", error: err.message });
    }
};


export const updateUomController = async (req, res) => {
    const { id } = req.params;
    const { uomname } = req.body;
    const updatedby = req.user.name;

    try {
        await uomModel.update(
            {
                uomname,
                updatedby: updatedby,
            },
            { where: { id } }
        );

        const updatedUom = await uomModel.findByPk(id);

        res.status(200).send({
            success: true,
            message: "UOM updated successfully",
            uom: updatedUom,
        });
    } catch (err) {
        return res.status(500).json({ message: "Error updating UOM", error: err.message });
    }
};


export const deleteUomController = async (req, res) => {
    const { id } = req.params;

    try {
        const uom = await uomModel.findByPk(id);
        if (!uom) {
            return res.status(404).json({ message: "Uom not found" });
        }

        await uom.destroy();

        res.status(200).json({
            success: true,
            message: "Uom deleted successfully",
        });
    } catch (err) {
        return res.status(500).json({ message: "Error deleting uom", error: err.message });
    }
};