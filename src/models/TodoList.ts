import { Document, model, Schema, ObjectId } from "mongoose";

export interface TodoListDocument extends Document {
  _id: any;
  user: ObjectId | string;
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
