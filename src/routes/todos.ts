import { Router } from "express";

import {
  getTodos,
  postTodos,
  updateTodos,
  deleteTodos,
} from "../controllers/todos";

const router = Router();

router.get("/", getTodos);

router.post("/todo", postTodos);

router.put("/todo/:todoId", updateTodos);

router.delete("/todo/:todoId", deleteTodos);

export default router;
