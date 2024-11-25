import vendorModel from "../models/vendor_models.js";
import invoiceModel from "../models/invoice_models.js";
import {Op} from "sequelize";

export const createInvoiceController = async (req, res) => {
    const {
        invoice_number, vendor_id, invoice_date, received_date, waybill_number,
        vehicle_number, received_by, cgst, sgst, gst, total_amount
    } = req.body;
    const createdby = req.user.name;

    try {
        const existingVendor = await vendorModel.findByPk(vendor_id);
        if (!existingVendor) {
            return res.status(404).json({message: "Vendor not found"});
        }

        const existingInvoice = await invoiceModel.findOne({where: {invoice_number}});
        if (existingInvoice) {
            return res.status(400).json({message: "Invoice already exists"});
        }

        const invoice = await invoiceModel.create({
            invoice_number, vendor_id, invoice_date, received_date, waybill_number,
            vehicle_number, received_by, cgst, sgst, gst, total_amount,
            createdby: createdby,
            updatedby: createdby,
        });

        res.status(201).json({
            success: true,
            message: "Invoice created successfully",
            invoice
        });
    } catch (err) {
        return res.status(500).json({message: "Error creating invoice", error: err.message});
    }
};


export const getAllInvoicesController = async (req, res) => {
    try {
        const invoices = await invoiceModel.findAll({});

        res.status(200).json({
            success: true,
            message: "List of all invoices",
            invoices
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error fetching invoices",
            error: err.message
        });
    }
};


export const getInvoiceByIdController = async (req, res) => {
    const { id } = req.params;

    try {
        const invoice = await invoiceModel.findByPk(id);
        
        if (!invoice) {
            return res.status(404).json({ message: "Invoice not found" });
        }

        res.status(200).send({
            success: true,
            message: "Invoice retrieved successfully",
            invoice,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error retrieving invoice", error: error.message });
    }
};



export const getAllInvoicesByVendorIdController = async (req, res) => {
    const { vendorid } = req.params;

    try {
        const vendor = await vendorModel.findByPk(vendorid);
        if (!vendor) {
            return res.status(404).json({ message: "UOM not found" });
        }

        const invoices = await invoiceModel.findAll({ where: { vendor_id: vendorid } });

        res.status(200).send({
            success: true,
            message: `All items for UOM ID: ${vendorid}`,
            invoices,
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


export const getAllInvoicesByDateRangeController = async (req, res) => {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
        return res.status(400).json({ message: "Start date and end date are required" });
    }

    try {
        const invoices = await invoiceModel.findAll({
            where: {
                invoice_date: {
                    [Op.between]: [new Date(startDate), new Date(endDate)],
                },
            },
        });

        res.status(200).send({
            success: true,
            message: `All invoices from ${startDate} to ${endDate}`,
            invoices,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error: error.message,
            message: "Error while getting invoices by date range",
        });
    }
};


export const getAllInvoicesByPriceRangeController = async (req, res) => {
    const { minAmount, maxAmount } = req.query;

    if (!minAmount || !maxAmount) {
        return res.status(400).json({ message: "Minimum amount and maximum amount are required" });
    }

    try {
        const invoices = await invoiceModel.findAll({
            where: {
                total_amount: {
                    [Op.between]: [parseFloat(minAmount), parseFloat(maxAmount)],
                },
            },
        });

        res.status(200).send({
            success: true,
            message: `All invoices with total amount between ${minAmount} and ${maxAmount}`,
            invoices,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error: error.message,
            message: "Error while getting invoices by amount range",
        });
    }
};


export const updateInvoiceController = async (req, res) => {
    const { id } = req.params;
    const updatedby = req.user.name;
    const {
        invoice_number, vendor_id, invoice_date, received_date, waybill_number,
        vehicle_number, received_by, cgst, sgst, gst, total_amount
    } = req.body;

    try {
        const invoice = await invoiceModel.findByPk(id);
        if (!invoice) {
            return res.status(404).json({ message: "Invoice not found" });
        }

        await invoice.update({
            invoice_number, vendor_id, invoice_date, received_date, waybill_number,
            vehicle_number, received_by, cgst, sgst, gst, total_amount,
            updatedby: updatedby,
        });

        res.status(200).send({
            success: true,
            message: "Invoice updated successfully",
            invoice,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error: error.message,
            message: "Error updating invoice",
        });
    }
};


export const deleteInvoiceController = async (req, res) => {
    const { id } = req.params;

    try {
        const invoice = await invoiceModel.findByPk(id);
        if (!invoice) {
            return res.status(404).json({ message: "Invoice not found" });
        }

        await invoice.destroy();

        res.status(200).send({
            success: true,
            message: "Invoice deleted successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error: error.message,
            message: "Error deleting invoice",
        });
    }
};
