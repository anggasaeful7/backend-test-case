import { Sequelize } from "sequelize";

const db = new Sequelize("backendtest", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
