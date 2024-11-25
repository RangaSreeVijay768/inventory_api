import { DataTypes } from 'sequelize';
import { dbConfig } from '../config/db.js';
import Recipe from './recipe_Model.js';

const RecipeMedia = dbConfig.define('RecipeMedia', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    recipe_id: {
        type: DataTypes.INTEGER,
        references: { model: Recipe, key: 'id' },
    },
    thumbnail_url: { type: DataTypes.STRING, allowNull: true },
    image_url: { type: DataTypes.STRING, allowNull: true },
    video_url: { type: DataTypes.STRING, allowNull: true }
}, {
    tableName: 'recipe_media',
    timestamps: true,
});

RecipeMedia.belongsTo(Recipe, { foreignKey: 'recipe_id' });
Recipe.hasMany(RecipeMedia, { foreignKey: 'recipe_id' });

export default RecipeMedia;
