import mongoose from "mongoose";
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    firstname: {
        type: String,
        min: [1, 'Firstname should be at least 1 character long.'],
        required: true,
    },
    lastname: {
        type: String,
        min: [1, 'Lastname should be at least 1 character long.'],
        required: true,
    },
    birthdate: {
        type: Date,
        required: true,
    },
});
const User = mongoose.model('User', UserSchema);

export default User;