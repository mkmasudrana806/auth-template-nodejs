import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import { TUser, TUserName } from "./user.interface";
import config from "../../config";

const userNameSchema = new Schema<TUserName>({
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
});

// create user schema
const userSchema = new Schema<TUser>(
  {
    name: { type: userNameSchema, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    age: { type: Number, required: true },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female", "others"],
    },
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
userSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

// hide password to client response
userSchema.post("save", function (doc) {
  doc.password = "";
});

// hide password to client response
userSchema.post("find", function (docs) {
  docs.forEach((doc: TUser) => {
    doc.password = "";
  });
});

// make a model and export
export const User = model<TUser>("User", userSchema);
