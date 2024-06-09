import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Borrows = db.define(
  "borrows",
  {
    id_user: {
      type: DataTypes.STRING,
    },
    id_book: {
      type: DataTypes.STRING,
    },
    date: {
      type: DataTypes.DATE,
    },
    expire: {
      type: DataTypes.DATE,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Borrows;
