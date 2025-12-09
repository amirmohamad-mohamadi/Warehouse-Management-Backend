import { DataTypes, Model } from "@sequelize/core";
import sequelize from "../config/database.js";

class User extends Model {
  declare id: number;
  declare email: string;
  declare password: string;
  declare username: string;
}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: false,
  }
);

export default User;
