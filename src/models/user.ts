import mongoose from "mongoose";
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    email: {
        type: String,
    },
    firstname: {
        type: String,
        min: [1, 'Firstname should be at least 1 character long.'],
    },
    lastname: {
        type: String,
        min: [1, 'Lastname should be at least 1 character long.'],
    },
    birthdate: Date,
});
const User = mongoose.model('User', UserSchema);

export default User;