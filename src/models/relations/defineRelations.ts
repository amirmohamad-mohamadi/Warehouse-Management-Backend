import Category from "@models/Category";
import InvoiceItem from "@models/InvoiceItemModel";
import Invoice from "@models/InvoiceModel";
import Person from "@models/PersonModel";
import Stuff from "@models/StuffModel";

Category.hasMany(Stuff, {
  foreignKey: {
    name: "categoryId",
    allowNull: false,
    validate: {
      notNull: { msg: "وارد کردن دسته کالا اجباری است" },
    },
  },
});

Person.hasMany(Invoice, {
  foreignKey: {
    name: "personId",
    allowNull: false,
    validate: {
      notNull: { msg: "وارد کردن طرف حساب فاکتور اجباری است" },
    },
  },
});

Stuff.belongsToMany(Invoice, {
  through: InvoiceItem,
  foreignKey: {
    name: "stuffId",
    allowNull: false,
    validate: {
      notNull: { msg: "وارد کردن شناسه کالا اجباری است" },
    },
  },
  otherKey: {
    name: "invoiceId",
    allowNull: false,
    validate: {
      notNull: { msg: "وارد کردن شناسه فاکتور اجباری است" },
    },
  },
});

Invoice.belongsToMany(Stuff, {
  through: InvoiceItem,
  foreignKey: {
    name: "invoiceId",
    allowNull: false,
    validate: {
      notNull: { msg: "وارد کردن شناسه فاکتور اجباری است" },
    },
  },
  otherKey: {
    name: "stuffId",
    allowNull: false,
    validate: {
      notNull: { msg: "وارد کردن شناسه کالا اجباری است" },
    },
  },
});
