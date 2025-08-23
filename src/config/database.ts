// src\config\database.ts
import { Sequelize } from "@sequelize/core";
import { MySqlDialect } from "@sequelize/mysql";
import config from "./config.js";

const sequelize = new Sequelize({
  dialect: MySqlDialect,
  database: config.db.name,
  user: config.db.user,
  password: config.db.pass,
  host: config.db.host,
  port: config.db.port,
  logging: false,
});

export default sequelize;
