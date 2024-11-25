import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export const dbConfig = new Sequelize(process.env.DB_URL, {
    dialect: 'postgres',
    logging: false
});
