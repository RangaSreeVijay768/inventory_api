import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export const dbConfig = new Sequelize(process.env.POSTGRES_URL, {
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
});
