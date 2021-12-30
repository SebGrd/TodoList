import TodoList from "../models/TodoList";
import { ObjectId } from "mongodb";
import TodoListItem from "../models/TodoListItem";
import dayjs from "dayjs";
import EmailSender from "../libs/EmailSender";
import { UserDocument } from "../models/User";

export interface TodoListItem {
  name: string;
  content: string;
  todoList: string;
}

const emailSender = new EmailSender("host", 5432);

export async function add({ name, content, todoList }: TodoListItem) {
  if (!ObjectId.isValid(todoList as string)) {
    throw new Error("Wrong syntax for provided id");
  }

  // If no existing TodoList
  const todoListDocument = await TodoList.findById(todoList).populate("user");

  if (!todoListDocument) {
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

  const createdThirtyMinutesAgo = await TodoListItem.findOne({
    createdAt: { $gt: dayjs().subtract(30, "minutes").toDate() },
  });

  if (createdThirtyMinutesAgo) {
    throw new Error("You must wait 30 minutes before");
  }

  const todoListItem = new TodoListItem({ name, content, todoList });

  const error = todoListItem.validateSync();

  if (error) {
    throw new Error(error.message);
  }

  await todoListItem.save();

  const count = await TodoListItem.count({ todoList });

  if (count === 8) {
    emailSender.sendMail(
      "todo-list",
      (todoListDocument.user as unknown as UserDocument).email,
      "Todo list limit",
      "You almost reach the limit of 10 items, you can only add 2 more !"
    );
  }

  return todoListItem;
}
