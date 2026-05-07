import sequelize from "@config/database";
import { DataTypes, Model } from "@sequelize/core";

export default class Invoice extends Model {
  declare id: number;
  declare type: "buy" | "sell";
  declare date: string;
  declare invoiceNumber: number;
  declare description: string;
  declare totalPrice: bigint;
}

Invoice.init(
  {
    type: {
      type: DataTypes.ENUM("buy", "sell"),
      allowNull: false,
      validate: {
        notNull: { msg: "نوع فاکتور را مشخص کنید" },
        isNotValid(value: any) {
          if (value !== "sell" && value !== "buy") {
            throw new Error("نوع فاکتور نامعتبر است");
          }
        },
      },
    },

    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notNull: { msg: "تاریخ فاکتور را مشخص کنید" },
        isNotValid(value: any) {
          const d = new Date(value);
          if (!d.getTime()) {
            throw new Error("تاریخ وارد شده معتبر نیست");
          }
        },
      },
    },

    invoiceNumber: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      unique: {
        name: "unique_invoice_number",
        msg: "شماره فاکتور نمی‌تواند تکراری باشد",
      },
      validate: {
        notNull: { msg: "شماره فاکتور را مشخص کنید" },
        rangeValidation(value: any) {
          value = Number(value);
          if (
            isNaN(value) ||
            value !== parseInt(value) ||
            value > 9999999 ||
            value < 1
          ) {
            throw new Error(
              "شماره فاکتور باید یک عدد صحیح مثبت 1 تا 7 رقمی باشد",
            );
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
            throw new Error("توضیحات نباید بیشتر از 1000 کاراکتر باشد");
          }
        },
      },
    },

    totalPrice: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: "Invoice",
    timestamps: false,
  },
);
