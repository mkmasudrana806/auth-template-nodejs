"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidations = void 0;
const zod_1 = __importDefault(require("zod"));
const userNameValidationSchema = zod_1.default.object({
    firstName: zod_1.default.string({
        invalid_type_error: "First name should be a string",
        required_error: "Firstname is required",
    }),
    middleName: zod_1.default.string().optional(),
    lastName: zod_1.default.string({
        invalid_type_error: "Lastname should be a string",
        required_error: "Lastname is required",
    }),
});
// create user validations schema
const createUserValidationsSchema = zod_1.default.object({
    body: zod_1.default.object({
        password: zod_1.default.string().optional(),
        user: zod_1.default.object({
            name: userNameValidationSchema,
            email: zod_1.default
                .string({
                required_error: "Email is required",
            })
                .email("Invalid email address"),
            age: zod_1.default.number({
                invalid_type_error: "Age should be a number",
                required_error: "Age is required",
            }),
            contact: zod_1.default.string({
                invalid_type_error: "Contact should be a string",
                required_error: "Contact number is required",
            }),
            address: zod_1.default.string({
                invalid_type_error: "Address should be a string",
                required_error: "Address is required",
            }),
        }),
    }),
});
exports.UserValidations = {
    createUserValidationsSchema,
};
