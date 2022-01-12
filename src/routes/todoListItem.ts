import express, { NextFunction, Request, Response } from "express";
const router = express.Router();
import { add } from "../services/todoListItem";

import TodoListItem from "../models/TodoListItem";

/* GET TodoListItem listing. */
router.get("/", async (req: Request, res: Response) => {
  const todoListItems = await TodoListItem.find();
  res.json(todoListItems);
});

/* GET TodoListItem. */
router.get("/:id", async (req: Request, res: Response) => {
  const todoListItem = await TodoListItem.findById(req.params.id);
  res.json(todoListItem);
});

/* POST TodoListItem. */
router.post("/", async ({ body }: Request, res: Response, next: NextFunction) => {
  try {
    await add(body);
  } catch (error) {
    return next(error);
  }
});

/* DELETE todoList. */
router.delete("/:id", async (req: Request, res: Response) => {
  const todoListItem = await TodoListItem.findByIdAndDelete(req.params.id);
  res.json(todoListItem);
});

export default router;
