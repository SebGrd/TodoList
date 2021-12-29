import { Document, model, Schema } from "mongoose";
import { UserDocument } from "./User";

export interface TodoListDocument extends Document {
  user: UserDocument;
}

const TodoListSchema = new Schema<TodoListDocument>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const TodoList = model<TodoListDocument>("TodoList", TodoListSchema);

export default TodoList;
