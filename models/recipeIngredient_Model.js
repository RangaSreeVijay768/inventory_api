import { DataTypes } from 'sequelize';
import { dbConfig } from '../config/db.js';
import Recipe from './recipe_Model.js';
import itemModel from './item_models.js';

const RecipeIngredient = dbConfig.define('RecipeIngredient', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    recipe_id: {
        type: DataTypes.INTEGER,
        references: { model: Recipe, key: 'id' },
    },
    item_id: {
        type: DataTypes.INTEGER,
        references: { model: itemModel, key: 'id' },
    },
    reference_qty: { type: DataTypes.FLOAT, allowNull: false },
}, {
    tableName: 'recipe_ingredients',
    timestamps: false,
});

RecipeIngredient.belongsTo(Recipe, { foreignKey: 'recipe_id' });
Recipe.hasMany(RecipeIngredient, { foreignKey: 'recipe_id' });

RecipeIngredient.belongsTo(itemModel, { foreignKey: 'item_id' });
itemModel.hasMany(RecipeIngredient, { foreignKey: 'item_id' });

export default RecipeIngredient;
