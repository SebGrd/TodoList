import mongoose from "mongoose";
const Schema = mongoose.Schema;
const TodoListSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Person',
        required: true,
        unique: true,
    },
});
const TodoList = mongoose.model('TodoList', TodoListSchema);

export default TodoList;