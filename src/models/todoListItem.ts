import mongoose from "mongoose";
const Schema = mongoose.Schema;
const TodoListItemSchema = new Schema({
    todoListId: {
        type: Schema.Types.ObjectId,
        ref: 'TodoList',
        required: true,
    },
    title: {
        type: String,
        unique: true,
    },
});
const TodoListItem = mongoose.model('TodoListItem', TodoListItemSchema);

export default TodoListItem;