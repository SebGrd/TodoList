import dayjs from "dayjs";
import { Document, model, Schema } from "mongoose";

export interface UserDocument extends Document {
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  birthdate: Date;
}

const UserSchema = new Schema<UserDocument>(
  {
    email: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: [true, "Firstname should be at least 1 character long."],
    },
    lastname: {
      type: String,
      required: [true, "Lastname should be at least 1 character long."],
    },
    password: {
      type: String,
      minlength: [8, "Password should be at least 8 characters long."],
      maxlength: [40, "Password should not exceed 40 characters."],
    },
    birthdate: {
      type: Date,
      required: true,
      validate: {
        validator: (birthdate: Date) => dayjs().diff(birthdate, "year") >= 13,
      },
    },
  },
  { timestamps: true }
);

const User = model<UserDocument>("User", UserSchema);

export default User;
