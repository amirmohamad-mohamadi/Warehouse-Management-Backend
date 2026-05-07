import { DataTypes, Model } from "@sequelize/core";
import sequelize from "@config/database";
import { slugify } from "@utils/helperFunction";
import { enToFa } from "@utils/globalFunctions";

class Category extends Model {
  declare title: string;
  declare slug: string;
}

Category.init(
  {
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
      set(value: string) {
        this.setDataValue("title", String(value).trim());
      },
      validate: {
        notNull: {
          msg: "وارد کردن عنوان دسته اجباری است",
        },
        isShort(value: string) {
          if (value.length < 2) {
            throw new Error(enToFa("عنوان دسته باید حداقل 2 کاراکتر باشد"));
          }
        },
        isLong(value: string) {
          if (value.length > 30) {
            throw new Error(
              enToFa("عنوان دسته نباید بیشتر از 30 کاراکتر باشد"),
            );
          }
        },
      },
    },
    slug: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: {
        name: "slug_unique",
        msg: "اسلاگ دسته نمی‌تواند تکراری باشد",
      },
      set(value: string) {
        this.setDataValue("slug", slugify(value));
      },
      validate: {
        notNull: {
          msg: "وارد کردن اسلاگ دسته اجباری است",
        },
        isShort(value: string) {
          if (value.length < 2) {
            throw new Error(enToFa("اسلاگ دسته باید حداقل 2 کاراکتر باشد"));
          }
        },
        isLong(value: string) {
          if (value.length > 30) {
            throw new Error(
              enToFa("اسلاگ دسته نباید بیشتر از 30 کاراکتر باشد"),
            );
          }
        },
      },
    },
  },
  {
    sequelize,
    modelName: "Category",
    timestamps: false,
    tableName: "Categories",
  },
);

export default Category;
