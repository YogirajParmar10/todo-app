import { Sequelize } from "sequelize";

const sequelize = new Sequelize("tasks", "root", "1010", {
  dialect: "mysql",
  host: "localhost",
});

export default sequelize;
