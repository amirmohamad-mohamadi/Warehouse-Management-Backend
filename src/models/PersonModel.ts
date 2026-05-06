import sequelize from "@config/database.js";
import { DataTypes, Model } from "@sequelize/core";
import { enToFa } from "@utils/globalFunctions.js";

class Person extends Model {
  declare fullname: string;
  declare phone: string;
  declare address: string;
}

Person.init(
  {
    fullname: {
      type: DataTypes.STRING(40),
      allowNull: false,
      unique: {
        name: "fullname_unique",
        msg: "نام طرف حساب نباید تکراری باشد",
      },
      set(value: string) {
        this.setDataValue("fullname", String(value).trim());
      },
      validate: {
        notNull: {
          msg: "وارد کردن نام طرف حساب اجباری است",
        },
        isShort(value: string) {
          if (value.length < 3) {
            throw new Error(enToFa("نام طرف حساب باید حداقل 3 کاراکتر باشد"));
          }
        },
        isLong(value: string) {
          if (value.length > 40) {
            throw new Error(
              enToFa("نام طرف حساب نباید بیشتر از 40 کاراکتر باشد"),
            );
          }
        },
      },
    },
    phone: {
      type: DataTypes.STRING(15),
      defaultValue: "",
      validate: {
        isNotValid(value: string) {
          if (value && !/^[0-9-]{3,15}$/.test(value)) {
            throw new Error("شماره تلفن را درست وارد کنید");
          }
        },
      },
    },
    address: {
      type: DataTypes.STRING(500),
      defaultValue: "",
      validate: {
        isLong(value: string) {
          if (value.length > 500) {
            throw new Error(
              enToFa("آدرس طرف حساب نباید بیشتر از 500 کاراکتر باشد"),
            );
          }
        },
      },
    },
  },
  {
    sequelize,
    modelName: "Person",
    timestamps: false,
    tableName: "Persons",
  },
);

export default Person;
