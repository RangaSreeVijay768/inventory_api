import express from 'express';
import dotenv from 'dotenv';
import authRoutes from "./routes/authentication_routes.js";
import roleRoutes from "./routes/role_routes.js";
import userRoleRoutes from "./routes/user_role_routes.js";
import {dbConfig} from "./config/db.js";
import uomRoutes from "./routes/uom_routes.js";
import itemRoutes from "./routes/item_routes.js";
import vendorRoutes from "./routes/vendor_routes.js";
import invoiceRoutes from "./routes/invoice_routes.js";
import inventoryRoutes from "./routes/inventory_routes.js";
import csvRoutes from "./routes/csv_routes.js";
import swaggerOptions from "./middlewares/swagger_options.js";
import dailyConsumptionRoutes from './routes/dailyConsumption_routes.js';
import consumptionDaysRoutes from './routes/consumptionDays_routes.js';
import categoryRoutes from './routes/recipe_category_routes.js'
import recipeRoutes from './routes/recipe_routes.js'
import ingredientRoutes from './routes/recipe_ingredient_routes.js'
import mediaRoutes from './routes/recipe_media_routes.js'
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from "swagger-ui-express";
import cors from "cors";
import { addRolesInitially, addUomsInitially } from './middlewares/initial_database.js';


dotenv.config();

const app = express();
const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use(cors())
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api", roleRoutes);
app.use("/api", userRoleRoutes);
app.use("/api", uomRoutes);
app.use("/api", itemRoutes);
app.use("/api", vendorRoutes);
app.use("/api", invoiceRoutes);
app.use("/api", inventoryRoutes);
app.use("/api", csvRoutes);
app.use('/api', dailyConsumptionRoutes);
app.use('/api', consumptionDaysRoutes);
app.use('/api', categoryRoutes);
app.use('/api', recipeRoutes);
app.use('/api', ingredientRoutes);
app.use('/api', mediaRoutes);
app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


dbConfig.sync().then(async () => {
    console.log("Database Connected.");
    await addRolesInitially(); 
    await addUomsInitially();
});

// dbConfig.sync({force: true}).then(async () => {
//     console.log("Database Connected and syncing forcely.");
//     await addRolesInitially(); 
//     await addUomsInitially();
// });


const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(
        `Server Running on development mode on port ${PORT}`
    );
});