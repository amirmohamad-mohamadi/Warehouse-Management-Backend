import sequelize from "@config/database";
import { DataTypes, Model } from "@sequelize/core";
import { formatPrice } from "@utils/globalFunctions";

export default class InvoiceItem extends Model {
  declare id: number;
  declare unitPrice: number;
  declare quantity: number;
  declare stuffId: number;
  declare invoiceId: number;
}

InvoiceItem.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },

    unitPrice: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      validate: {
        notNull: { msg: "وارد کردن قیمت واحد اجباری است" },
        rangeValidation(value: any) {
          value = Number(value);
          if (isNaN(value) || value !== parseInt(value)) {
            throw new Error("قیمت کالا باید یک عدد صحیح باشد");
          } else if (value > 4e9) {
            throw new Error(
              `قیمت واحد نباید بزرگتر از ${formatPrice(4e9)} باشد`,
            );
          } else if (value < 0) {
            throw new Error("قیمت واحد نباید منفی باشد");
          }
        },
      },
    },

    quantity: {
      type: DataTypes.MEDIUMINT.UNSIGNED,
      allowNull: false,
      validate: {
        notNull: { msg: "وارد کردن تعداد کالا اجباری است" },
      },
    },
  },
  {
    sequelize,
    modelName: "InvoiceItem",
    timestamps: false,

    indexes: [
      {
        name: "unique_stuff_invoice",
        unique: true,
        fields: ["stuffId", "invoiceId"],
      },
    ],
  },
);
