import express, { Application, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";

import sequelize from "./util/database";
import todosRouter from "./routes/todos";
import path from "path";

const app: Application = express();

app.use(bodyParser.json());
app.use(todosRouter);

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

sequelize
  .sync()
  .then(() => {
    app.listen(9090);
  })
  .catch((err) => {
    console.log(err);
  });
