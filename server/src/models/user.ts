import {
	Model,
	InferAttributes,
	InferCreationAttributes,
	CreationOptional,
	DataTypes,
} from "sequelize";
import { sequelize } from "../database/database";
import bcrypt from "bcrypt";
import { ApiUser } from "../types/user_types";

export class User extends Model<
	InferAttributes<User>,
	InferCreationAttributes<User>
> {
	declare user_id: CreationOptional<number>;
	declare password: string;
	declare api_hash: string;
	declare first_name: string;
  declare last_name: string;
  declare email: string;
  declare user_name: string;
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
			allowNull: true,
		},
		first_name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		last_name: {
			type: DataTypes.STRING,
			allowNull: false,
		},    
    email: {
			type: DataTypes.STRING,
			allowNull: false,
      unique: true,
		},
    user_name: {
			type: DataTypes.STRING,
			allowNull: true,
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
  const exists = await User.findOne({
    where: {
      email: user.email
    },
  }); 

  if (exists !== null) {
    throw new Error("User with the given email already exists.");
  } else {
    try {
      const response = await connectUser(user);
      const connUser = await response.json() as ApiUser;
      user.api_hash = connUser.hash;
			user.user_name = connUser.username;
    } catch (e) {
      throw new Error(`Error while creating new user: ${e}`);
    }
  }
  const saltRounds = 8;
  user.password =  bcrypt.hashSync(user.password, saltRounds);
});



const connectUser = (async(user: User) => {
  const response = await fetch("https://api.spoonacular.com/users/connect", {
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": `${process.env.SPOONACULAR_API_KEY}`,
    },
    method: "POST",
    body: JSON.stringify(user),
  });
  return response;

});



