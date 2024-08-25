"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userNameSchema = new mongoose_1.Schema({
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
});
// create user schema
const userSchema = new mongoose_1.Schema({
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
}, {
    timestamps: true,
});
// pre middleware hook to hash password
// make a model and export
exports.User = (0, mongoose_1.model)("User", userSchema);
