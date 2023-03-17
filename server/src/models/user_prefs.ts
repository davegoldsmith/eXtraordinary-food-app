import {
	Model,
	InferAttributes,
	InferCreationAttributes,
	CreationOptional,
	DataTypes,
} from "sequelize";
import { sequelize } from "../database/database";

export class UserPrefs extends Model<
	InferAttributes<UserPrefs>,
	InferCreationAttributes<UserPrefs>
> {
	declare pref_id: CreationOptional<number>;
	declare pref_name: string;
	declare pref_value: string;
	declare user_id: number;
}

UserPrefs.init(
	{
		pref_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
      autoIncrement: true,
		},
		pref_name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		pref_value: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		user_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},     
	},
	{
		modelName: "UserPrefs",
    schema: "mealapp_schema",
		timestamps: false,
		sequelize: sequelize,
    tableName: "user_prefs"
	}
);

