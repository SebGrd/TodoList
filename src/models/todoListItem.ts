import { Document, model, Schema } from "mongoose";

export interface TodoListItemDocument extends Document {
  name: string;
  content: string;
  createdAt: Date;
  todoList: TodoListItemDocument;
}

const TodoListItemSchema = new Schema<TodoListItemDocument>(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    content: {
      type: String,
      maxlength: [1000, "Content cannot exceed 1000 characters"],
      required: true,
    },
    todoList: {
      type: Schema.Types.ObjectId,
      ref: "TodoList",
      required: true,
    },
  },
  { timestamps: true }
);

const TodoListItem = model<TodoListItemDocument>("TodoListItem", TodoListItemSchema);

export default TodoListItem;
