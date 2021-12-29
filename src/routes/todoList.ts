import express, { Request, Response } from "express";
const router = express.Router();

import TodoList from "../models/TodoList";
import User from "../models/User";

/* GET todoList listing. */
router.get("/", async (req: Request, res: Response) => {
  const todoLists = await TodoList.find();
  res.json(todoLists);
});

/* GET todoList. */
router.get("/:id", async (req: Request, res: Response) => {
  const todoList = await TodoList.findById(req.params.id);
  res.json(todoList);
});

/* POST todoList. */
router.post("/", async (req: Request, res: Response) => {
  const userId = req.body.userId;
  // If bad ID
  if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
    res.status(400);
    return res.json("Wrong syntax for provided id");
  }
  // If existing todolist
  const existingTodoList = await TodoList.findOne({ userId });
  if (existingTodoList) {
    res.status(403);
    return res.json("Already existing TodoList for that User");
  }
  // If userId matched an User
  const userFound = await User.findById(userId);
  if (!userFound) {
    res.status(400);
    return res.json("Provided id didn't match any User");
  }
  const todoList = new TodoList(req.body);
  const error = todoList.validateSync();
  if (error) {
    res.status(400);
    return res.json(error.message);
  }
  todoList.save();
  res.json(todoList);
});

/* DELETE todoList. */
router.delete("/:id", async (req: Request, res: Response) => {
  const todoList = await TodoList.findByIdAndDelete(req.params.id);
  res.json(todoList);
});

export default router;
