import { Document, model, Schema } from "mongoose";

export interface todoListItemDocument extends Document {
  name: string;
  content: string;
  createdAt: Date;
  todoList: todoListItemDocument;
}

const TodoListItemSchema = new Schema<todoListItemDocument>(
  {
    name: {
      type: String,
      unique: true,
    },
    content: {
      type: String,
      maxlength: [1000, "Content cannot exceed 1000 characters"],
    },
    todoList: {
      type: Schema.Types.ObjectId,
      ref: "TodoList",
      required: true,
    },
  },
  { timestamps: true }
);

const TodoListItem = model<todoListItemDocument>("TodoListItem", TodoListItemSchema);

export default TodoListItem;
