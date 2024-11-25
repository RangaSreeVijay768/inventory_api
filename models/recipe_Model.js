import { DataTypes } from "sequelize";
import { dbConfig } from "../config/db.js";
import RecipeCategory from "./recipeCategory_model.js";

const Recipe = dbConfig.define("Recipe",
    {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    recipe_name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    instructions: { type: DataTypes.TEXT, allowNull: true },
    comments: { type: DataTypes.TEXT, allowNull: true },
    is_lc_recipe: { type: DataTypes.BOOLEAN, defaultValue: false },
    category_id: {
      type: DataTypes.INTEGER,
      references: { model: RecipeCategory, key: "id" },
    },
  },
  {
    tableName: "recipes",
    timestamps: true,
  }
);

Recipe.belongsTo(RecipeCategory, { foreignKey: "category_id" });
RecipeCategory.hasMany(Recipe, { foreignKey: "category_id" });


export default Recipe;
