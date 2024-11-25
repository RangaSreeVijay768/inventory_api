
import consumptionDaysModel from "../models/consumption_days_model.js";
import dailyConsumptionModel from "../models/daily_consumption_model.js";

// Create Consumption Day
export const createConsumptionDayController = async (req, res) => {
    const { date, adults_count, children_count } = req.body;

    try {
        
        const consumptionDay = await consumptionDaysModel.create({
            date, adults_count, children_count
        });

        res.status(201).send({
            success: true,
            message: "Consumption Day Created Successfully",
            consumptionDay,
        });
    } catch (err) {
        return res.status(500).json({ message: "Error creating consumption day", error: err.message });
    }
};

// Get All Consumption Days
export const getAllConsumptionDaysController = async (req, res) => {
    try {
        const consumptionDays = await consumptionDaysModel.findAll({});
        res.status(200).send({
            success: true,
            message: "All Consumption Days List",
            consumptionDays,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while getting all consumption days",
        });
    }
};

// Get Consumption Day by ID
export const getConsumptionDayByIdController = async (req, res) => {
    const { id } = req.params;

    try {
        const consumptionDay = await consumptionDaysModel.findByPk(id);

        if (!consumptionDay) {
            return res.status(404).json({ message: "Consumption Day not found" });
        }

        res.status(200).send({
            success: true,
            message: "Consumption Day retrieved successfully",
            consumptionDay,
        });
    } catch (err) {
        return res.status(500).json({ message: "Error retrieving consumption day", error: err.message });
    }
};

// Update Consumption Day
export const updateConsumptionDayController = async (req, res) => {
    const { id } = req.params;
    const { date, adults_count, children_count} = req.body;
    const updatedBy = req.user.name;

    try {
        const consumptionDay = await consumptionDaysModel.findByPk(id);
        if (!consumptionDay) {
            return res.status(404).json({ message: "Consumption Day not found" });
        }

        await consumptionDaysModel.update(
            {
                date, adults_count, children_count
            },
            { where: { id } }
        );

        const updatedConsumptionDay = await consumptionDaysModel.findByPk(id);

        res.status(200).send({
            success: true,
            message: "Consumption Day updated successfully",
            consumptionDay: updatedConsumptionDay,
        });
    } catch (err) {
        return res.status(500).json({ message: "Error updating consumption day", error: err.message });
    }
};

// Delete Consumption Day
export const deleteConsumptionDayController = async (req, res) => {
    const { id } = req.params;

    try {
        const consumptionDay = await consumptionDaysModel.findByPk(id);
        if (!consumptionDay) {
            return res.status(404).json({ message: "Consumption Day not found" });
        }

         // deleteing  dependent records in the daily_consumptions table
        await dailyConsumptionModel.destroy({ where: { consumption_day: id } }); 

        await consumptionDaysModel.destroy({ where: { id } });

        res.status(200).send({
            success: true,
            message: "Consumption Day deleted successfully",
        });
    } catch (err) {
        return res.status(500).json({ message: "Error deleting consumption day", error: err.message });
    }
};
