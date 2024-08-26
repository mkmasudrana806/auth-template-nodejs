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
exports.UserServices = void 0;
const config_1 = __importDefault(require("../../config"));
const allowedFieldUpdatedData_1 = __importDefault(require("../../utils/allowedFieldUpdatedData"));
const makeFlattenedObject_1 = __importDefault(require("../../utils/makeFlattenedObject"));
const user_constant_1 = require("./user.constant");
const user_model_1 = require("./user.model");
/**
 * ----------------------- Create an user----------------------
 * @param payload new user data
 * @returns return newly created user
 */
const createAnUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // set default password if password is not provided
    payload.password = payload.password || config_1.default.default_password;
    const result = yield user_model_1.User.create(payload);
    return result;
});
/**
 * ----------------------- get all users ----------------------
 * @return return all users
 */
const getAllUsersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.find({});
    return result;
});
/**
 * -----------------  get me  -----------------
 * @param role user role
 * @param id mongoose id of an user
 * @returns own user data
 */
const getMe = (role, id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOne({ _id: id, role: role });
    return result;
});
/**
 * --------------- delete an user form db ----------------
 * @param id user id
 * @returns return deleted user data
 */
const deleteUserFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    return result;
});
/**
 * --------------- update an user form db ----------------
 * @param id user id
 * @param payload update user data
 * @returns return updated user data
 */
const updateUserIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // filter allowed fileds only
    const allowedFieldData = (0, allowedFieldUpdatedData_1.default)(user_constant_1.allowedFieldsToUpdate, payload);
    // make flattened object
    const flattenedData = (0, makeFlattenedObject_1.default)(allowedFieldData);
    const result = yield user_model_1.User.findByIdAndUpdate(id, flattenedData, { new: true });
    return result;
});
exports.UserServices = {
    createAnUserIntoDB,
    getAllUsersFromDB,
    getMe,
    deleteUserFromDB,
    updateUserIntoDB,
};
