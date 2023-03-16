import { sequelize } from "../database/database";
import { Model, InferAttributes, InferCreationAttributes, DataTypes } from "sequelize";

export class RecipeUrl extends Model<InferAttributes<RecipeUrl>, InferCreationAttributes<RecipeUrl>> {
    declare user_id: number;
    declare url: string;
}

RecipeUrl.init(
    {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "RecipeUrl",
        schema: "mealapp_schema",

    });
