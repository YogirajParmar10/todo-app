import { Request, Response, NextFunction } from "express";
import todos from "../models/todos";
import path from "path";

type RequestBody = { task: string }; // aliaces
type RequestParams = { todoId: string }; // aliaces

export const getTodos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const allTodos = await todos.findAll();
  res.status(200).json({ todos: allTodos });
};

export const postTodos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const body = req.body as RequestBody;
  try {
    const newTodo = await todos.create({
      task: body.task,
    });
    res.status(201).json({
      message: "Todo Created!",
      todo: newTodo,
    });
  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const updateTodos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const body = req.body as RequestBody;
  const params = req.params as RequestParams;

  const updatedTask = body.task;
  const tid = params.todoId;
  try {
    await todos.update(
      {
        task: updatedTask,
      },
      {
        where: {
          id: tid,
        },
      }
    );
    res
      .status(200)
      .json({ message: "Todo updated successfully", todo: updatedTask });
  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const deleteTodos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const params = req.params as RequestParams;
  const todoId = params.todoId;
  try {
    const todo = await todos.findByPk(todoId);
    await todo!.destroy();
  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
