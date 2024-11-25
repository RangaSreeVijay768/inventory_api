import vendorModel from "../models/vendor_models.js";


export const createVendorController = async (req, res) => {
    const { vendorname, address, city, state, country,
        pincode, gstnumber, contactnumber, email, altcontactnumber } = req.body;
    const createdby = req.user.name;

    try {
        const existingVendor = await vendorModel.findOne({where: { email }});
        if (existingVendor) {
            return res.status(400).json({ message: "Vendor already exists" });
        }

        const vendor = await vendorModel.create({ vendorname, address, city, state, country,
            pincode, gstnumber, contactnumber, email, altcontactnumber,
            createdby: createdby,
            updatedby: createdby,
        });

        res.status(201).send({
            success: true,
            message: "Vendor Created Successfully",
            vendor,
        });
    } catch (err) {
        return res.status(500).json({ message: "Error creating vendor", error: err.message });
    }
};



export const getAllVendorsController = async (req, res) => {
    try {
        const vendor = await vendorModel.findAll({});
        res.status(200).send({
            success: true,
            message: "All Vendors List",
            vendor,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while getting all vendors",
        });
    }
};


export const getVendorByIdController = async (req, res) => {
    const { id } = req.params;

    try {
        const vendor = await vendorModel.findByPk(id);
        
        if (!vendor) {
            return res.status(404).json({ message: "Vendor not found" });
        }

        res.status(200).send({
            success: true,
            message: "Vendor retrieved successfully",
            vendor,
        });
    } catch (err) {
        return res.status(500).json({ message: "Error retrieving vendor", error: err.message });
    }
};



export const updateVendorController = async (req, res) => {
    const {id} = req.params;
    const {vendorname, address, city, state, country,
        pincode, gstnumber, contactnumber, altcontactnumber} = req.body;
    const updatedby = req.user.name;

    try {
        await vendorModel.update(
            {
                vendorname, address, city, state, country,
                pincode, gstnumber, contactnumber, altcontactnumber,
                updatedby: updatedby
            },
            {where: {id}}
        );

        const updatedVendor = await vendorModel.findByPk(id);

        res.status(200).send({
            success: true,
            message: "Vendor updated successfully",
            vendor: updatedVendor,
        });
    } catch (err) {
        return res.status(500).json({message: "Error updating vendor", error: err.message});
    }
};


export const deleteVendorController = async (req, res) => {
    const {id} = req.params;

    try {
        await vendorModel.destroy({where: {id}});

        res.status(200).send({
            success: true,
            message: "Vendor deleted successfully",
        });
    } catch (err) {
        return res.status(500).json({message: "Error deleting vendor", error: err.message});
    }
};

