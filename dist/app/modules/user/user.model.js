"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
const userNameSchema = new mongoose_1.Schema({
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
});
// create user schema
const userSchema = new mongoose_1.Schema({
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
}, {
    timestamps: true,
});
// pre middleware hook to hash password
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        user.password = yield bcrypt_1.default.hash(user.password, Number(config_1.default.bcrypt_salt_rounds));
        next();
    });
});
// hide password to client response
userSchema.post("save", function (doc) {
    doc.password = "";
});
// hide password to client response
userSchema.post("find", function (docs) {
    docs.forEach((doc) => {
        doc.password = "";
    });
});
// make a model and export
exports.User = (0, mongoose_1.model)("User", userSchema);
