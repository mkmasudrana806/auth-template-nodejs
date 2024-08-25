import { model, Schema } from "mongoose";
import { TUser, TUserName } from "./user.interface";

const userNameSchema = new Schema<TUserName>({
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
});

// create user schema
const userSchema = new Schema<TUser>(
  {
    name: { type: userNameSchema, required: true },
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: true,
    },
    age: { type: Number, required: true },
    contact: { type: String, required: true },
    address: { type: String, required: true },
    role: {
      type: String,
      required: true,
      enum: ["user", "admin"],
      default: "user",
    },
    status: {
      type: String,
      required: true,
      enum: ["active", "blocked"],
      default: "active",
    },
    isDeleted: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);

// pre middleware hook to hash password

// make a model and export
export const User = model<TUser>("User", userSchema);
