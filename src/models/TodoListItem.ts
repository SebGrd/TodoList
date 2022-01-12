import { Document, model, ObjectId, Schema } from "mongoose";

export interface TodoListItemDocument extends Document {
  _id: any;
  name: string;
  content: string;
  todoList: ObjectId | string;
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
