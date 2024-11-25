import dailyConsumptionModel from "../models/daily_consumption_model.js";
import consumptionDaysModel from "../models/consumption_days_model.js";
import itemModel from "../models/item_models.js";
import uomModel from "../models/uom_models.js";
// Create Daily Consumption

export const createDailyConsumptionController = async (req, res) => {
  const { consumption_day, item_id, quantity, UOM_id } = req.body;

  try {
    const consumptionDayExists = await consumptionDaysModel.findByPk(consumption_day);
    if (!consumptionDayExists) {
      return res.status(400).json({ message: "Consumption day not found" });
    }

    const itemExists = await itemModel.findByPk(item_id);
    if (!itemExists) {
      return res.status(400).json({ message: "Item not found" });
    }

    const uomExists = await uomModel.findByPk(UOM_id);
    if (!uomExists) {
      return res.status(400).json({ message: "UOM not found" });
    }

    const dailyConsumption = await dailyConsumptionModel.create({
      consumption_day,
      item_id,
      quantity,
      UOM_id,
    });

    res.status(201).send({
      success: true,
      message: "Daily Consumption Created Successfully",
      dailyConsumption,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error creating daily consumption",
      error: err.message,
    });
  }
};

// Get All Daily Consumptions
export const getAllDailyConsumptionsController = async (req, res) => {
  try {
   

    const dailyConsumptions = await dailyConsumptionModel.findAll({
      attributes: {
        exclude: ["created_at", "updated_at"], 
      },
      include: [
        {
          model: consumptionDaysModel,
          attributes: { exclude: ["created_at", "updated_at"] },
        },
        {
          model: itemModel,
          attributes: {
            exclude: ["created_at", "updated_at", "createdby", "updatedby"],
          },
        },
        {
          model: uomModel,
          attributes: {
            exclude: ["created_at", "updated_at", "createdby", "updatedby"],
          },
        },
      ],
    });
    res.status(200).send({
      success: true,
      message: "All Daily Consumptions List",
      dailyConsumptions,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all daily consumptions",
    });
  }
};


// Get Daily Consumption by DateID
export const getDailyConsumptionByIdController = async (req, res) => {
  const { dateId } = req.params;

  try {
    const dailyConsumption = await dailyConsumptionModel.findAll({
      where: { consumption_day: dateId },

      attributes: { exclude: ["created_at", "updated_at"] },
      include: [
        {
          model: consumptionDaysModel,
          attributes: { exclude: ["created_at", "updated_at"] },
        },
        {
          model: itemModel,
          attributes: {
            exclude: ["created_at", "updated_at", "createdby", "updatedby"],
          },
        },
        {
          model: uomModel,
          attributes: {
            exclude: ["created_at", "updated_at", "createdby", "updatedby"],
          },
        },
      ],
    });

    if (!dailyConsumption) {
      return res.status(404).json({ message: "Daily Consumption not found" });
    }

    res.status(200).send({
      success: true,
      message: "Daily Consumption based on date retrieved successfully",
      dailyConsumption,
    });
  } catch (err) {
    return res
      .status(500)
      .json({
        message: "Error retrieving daily consumption",
        error: err.message,
      });
  }
};

// Update Daily Consumption
export const updateDailyConsumptionController = async (req, res) => {
  const { id } = req.params;
  const { consumption_day, item_id, quantity, UOM_id } = req.body;

  try {
    const dailyConsumption = await dailyConsumptionModel.findByPk(id);
    if (!dailyConsumption) {
      return res.status(404).json({ message: "Daily Consumption not found" });
    }

    const consumptionDayExists = await consumptionDaysModel.findByPk(
      consumption_day
    );
    if (!consumptionDayExists) {
      return res.status(400).json({ message: "Consumption day not found" });
    }

    await dailyConsumptionModel.update(
      { consumption_day, item_id, quantity, UOM_id },
      { where: { id } }
    );

    const updatedDailyConsumption = await dailyConsumptionModel.findByPk(id);

    res.status(200).send({
      success: true,
      message: "Daily Consumption updated successfully",
      dailyConsumption: updatedDailyConsumption,
    });
  } catch (err) {
    return res
      .status(500)
      .json({
        message: "Error updating daily consumption",
        error: err.message,
      });
  }
};

// Delete Daily Consumption
export const deleteDailyConsumptionController = async (req, res) => {
  const { id } = req.params;

  try {
    const dailyConsumption = await dailyConsumptionModel.findByPk(id);
    if (!dailyConsumption) {
      return res.status(404).json({ message: "Daily Consumption not found" });
    }

    await dailyConsumptionModel.destroy({ where: { id } });

    res.status(200).send({
      success: true,
      message: "Daily Consumption deleted successfully",
    });
  } catch (err) {
    return res
      .status(500)
      .json({
        message: "Error deleting daily consumption",
        error: err.message,
      });
  }
};
