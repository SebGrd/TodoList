import TodoList from "../models/TodoList";
import { ObjectId } from "mongodb";
import TodoListItem, { TodoListItemDocument } from "../models/TodoListItem";

interface TodoLIstItem {
  name: string;
  content: string;
  todoList: string;
}

export async function add({ name, content, todoList }: TodoLIstItem) {
  if (!ObjectId.isValid(todoList as string)) {
    throw new Error("Wrong syntax for provided id");
  }

  // If no existing TodoList
  const existingTodoList = await TodoList.findById(todoList);

  if (!existingTodoList) {
    throw new Error("No existing TodoList with provided id");
  }

  // If existing TodoListItem
  const existingTodoListItem = await TodoListItem.findOne({
    todoList,
    name,
  });

  if (existingTodoListItem) {
    throw new Error("Already existing item with the same title in this TodoList");
  }

  const todoListItem = new TodoListItem({ name, content, todoList });

  const error = todoListItem.validateSync();

  if (error) {
    throw new Error(error.message);
  }

  todoListItem.save();

  return todoListItem;
}
