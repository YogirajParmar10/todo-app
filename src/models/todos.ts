import sequelize from "../util/database";
import { DataTypes } from "sequelize";

const todos = sequelize.define("todos", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  task: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default todos;
