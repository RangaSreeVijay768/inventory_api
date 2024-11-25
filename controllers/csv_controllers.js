import createCsvWriter from 'csv-writer';
import csv from 'csv-parser';
import itemModel from "../models/item_models.js";
import uomModel from "../models/uom_models.js";
import vendorModel from "../models/vendor_models.js";
import inventoryModel from "../models/inventory_models.js";
import invoiceModel from "../models/invoice_models.js";
import { Readable } from 'stream';

export const exportToCSVController = async (req, res) => {
    const { modelName, fields } = req.body;
    const models = {
        item: itemModel,
        uom: uomModel,
        vendor: vendorModel,
        inventory: inventoryModel,
        invoice: invoiceModel
    };

    try {
        const model = models[modelName];
        if (!model) {
            return res.status(400).json({ message: `Model '${modelName}' not found` });
        }

        const data = await model.findAll({});
        if (!data || data.length === 0) {
            return res.status(404).json({ message: `No data found for model '${modelName}'` });
        }

        const csvWriter = createCsvWriter.createObjectCsvStringifier({
            header: fields.map(field => ({ id: field, title: field })),
        });

        const csvData = csvWriter.getHeaderString() + csvWriter.stringifyRecords(data);

        res.header('Content-Type', 'text/csv');
        res.attachment(`${modelName}.csv`);
        res.status(200).send(csvData);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: `Error while exporting ${modelName} to CSV`,
        });
    }
};



export const importFromCSVController = async (req, res) => {
    const { modelName } = req.body;
    const createdby = req.user.name;
    const models = {
        item: itemModel,
        uom: uomModel,
        vendor: vendorModel,
        inventory: inventoryModel,
        invoice: invoiceModel
    };

    try {
        const model = models[modelName];
        if (!model) {
            return res.status(400).json({ message: `Model '${modelName}' not found` });
        }

        const csvFile = req.file;
        if (!csvFile) {
            return res.status(400).json({ message: "No CSV file uploaded" });
        }

        const csvData = csvFile.buffer.toString();
        if (!csvData) {
            return res.status(400).json({ message: "CSV data is empty" });
        }

        const results = [];
        const readableStream = Readable.from([csvFile.buffer]);

        readableStream
            .pipe(csv())
            .on('data', (data) => {
                if (data.uomid && data.itemname) {
                    results.push({
                        uomid: data.uomid.trim(),
                        itemname: data.itemname.trim(),
                        createdby: createdby,
                        updatedby: createdby
                    });
                }
            })
            .on('end', async () => {
                if (results.length === 0) {
                    return res.status(400).json({ message: "No valid data found to import" });
                }

                try {
                    const createdRecords = await model.bulkCreate(results);
                    res.status(200).json({ message: `${modelName} data imported successfully`, data: createdRecords });
                } catch (error) {
                    res.status(500).json({ message: "Error importing data", error: error.message });
                }
            })
            .on('error', (error) => {
                res.status(500).json({ message: "Error reading CSV data", error: error.message });
            });
    } catch (error) {
        res.status(500).send({
            success: false,
            error: error.message || error,
            message: `Error while importing from ${modelName} CSV`,
        });
    }
};


