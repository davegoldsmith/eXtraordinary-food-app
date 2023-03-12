import {
	Model,
	InferAttributes,
	InferCreationAttributes,
	CreationOptional,
	DataTypes,
} from "sequelize";
import { sequelize } from "../database/database";
import bcrypt from "bcrypt";

export class User extends Model<
	InferAttributes<User>,
	InferCreationAttributes<User>
> {
	declare user_id: CreationOptional<number>;
	declare password: string;
	declare api_hash: string;
	declare display_name: string;
  declare email: string;
}

User.init(
	{
		user_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
      autoIncrement: true,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		api_hash: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		display_name: {
			type: DataTypes.STRING,
			allowNull: true,
		},
    email: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		modelName: "User",
    schema: "mealapp_schema",
		timestamps: false,
		sequelize: sequelize,
    tableName: "users"
	}
);

User.beforeCreate(async (user, options) => {
  const saltRounds = 8;
  user.password =  bcrypt.hashSync(user.password, saltRounds);
});



