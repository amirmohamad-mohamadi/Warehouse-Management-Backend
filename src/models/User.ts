import { DataTypes, Model } from "@sequelize/core";
import sequelize from "../config/database";

class User extends Model {
  declare id: number;
  declare email: string;
  declare password: string;
  declare username: string;
  declare resetToken: string | null;
  declare resetTokenExpiry: Date | null;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
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
    // 🆕 فیلدهای مربوط به forgot-password
    resetToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    resetTokenExpiry: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: false, // یا true اگر بخوای createdAt/updatedAt داشته باشی
  },
);

export default User;
