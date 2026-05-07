import sequelize from "@config/database";
import { DataTypes, Model } from "@sequelize/core";
import { enToFa, formatPrice } from "@utils/globalFunctions";

class Stuff extends Model {
  declare title: string;
  declare buyPrice: number;
}

Stuff.init(
  {
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
      set(value: string) {
        this.setDataValue("title", String(value).trim());
      },
      validate: {
        notNull: {
          msg: "وارد کردن عنوان کالا اجباری است",
        },
        isShort(value: string) {
          if (value.length < 3) {
            throw new Error(enToFa("عنوان کالا باید حداقل 3 کاراکتر باشد"));
          }
        },
        isLong(value: string) {
          if (value.length > 60) {
            throw new Error(
              enToFa("عنوان کالا نباید بیشتر از 60 کاراکتر باشد"),
            );
          }
        },
      },
    },
    buyPrice: {
      type: DataTypes.INTEGER.UNSIGNED,
      defaultValue: 0,
      validate: {
        rangeValidation(value: number) {
          value = Number(value);
          if (isNaN(value) || value !== parseInt(String(value))) {
            throw new Error("قیمت خرید باید یک عدد صحیح باشد");
          } else if (value > 4e9) {
            throw new Error(
              `قیمت خرید نباید بزرگتر از ${formatPrice(4e9)} باشد`,
            );
          } else if (value < 0) {
            throw new Error("قیمت خرید نباید منفی باشد");
          }
        },
      },
    },
    sellPrice: {
      type: DataTypes.INTEGER.UNSIGNED,
      defaultValue: 0,
      validate: {
        rangeValidation(value: number) {
          value = Number(value);
          if (isNaN(value) || value !== parseInt(String(value))) {
            throw new Error("قیمت فروش باید یک عدد صحیح باشد");
          } else if (value > 4e9) {
            throw new Error(
              `قیمت فروش نباید بزرگتر از ${formatPrice(4e9)} باشد`,
            );
          } else if (value < 0) {
            throw new Error("قیمت فروش نباید منفی باشد");
          }
        },
      },
    },
    description: {
      type: DataTypes.STRING(1000),
      defaultValue: "",
      validate: {
        isLong(value: string) {
          if (value.length > 1000) {
            throw new Error(enToFa("توضیحات نباید بیشتر از 1000 کاراکتر باشد"));
          }
        },
      },
    },
  },
  {
    sequelize,
    modelName: "Stuff",
    timestamps: false,
    tableName: "stuffs",
  },
);

export default Stuff;
