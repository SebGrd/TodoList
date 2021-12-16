import express, { Request, Response } from "express";
const router = express.Router();

import TodoListItem from "../models/todoListItem";
import TodoList from "../models/todoList";

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
router.post("/", async (req: Request, res: Response) => {
  const todoListId = req.body.todoListId;

  // If bad ID
  if (!todoListId.match(/^[0-9a-fA-F]{24}$/)) {
    res.status(400);
    return res.json("Wrong syntax for provided id");
  }
  // If no existing TodoList
  const existingTodoList = await TodoList.findById(todoListId);
  if (!existingTodoList) {
    res.status(403);
    return res.json("No existing TodoList with provided id");
  }
  // if duplicated
  const duplicatedTodoListItem = await TodoListItem.findOne({
    todoListId: todoListId,
    title: req.body.title,
  });
  if (duplicatedTodoListItem) {
    res.status(403);
    return res.json("Already existing item with the same title in this TodoList");
  }

  const todoListItem = new TodoListItem(req.body)
  const error = todoListItem.validateSync();
  if (error) {
    res.status(400);
    return res.json(error.message);
  }
  todoListItem.save();
  res.json(todoListItem);
});

/* DELETE todoList. */
router.delete("/:id", async (req: Request, res: Response) => {
  const todoListItem = await TodoListItem.findByIdAndDelete(req.params.id);
  res.json(todoListItem);
});

export default router;