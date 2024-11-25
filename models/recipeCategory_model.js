import { DataTypes } from 'sequelize';
import { dbConfig } from '../config/db.js';

const RecipeCategory = dbConfig.define('RecipeCategory', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
}, {
    tableName: 'recipe_categories',
    timestamps: false,
});


export default RecipeCategory;
