import jwt from "jsonwebtoken";
import config from "../../config";
import makeAllowedFieldData from "../../utils/allowedFieldUpdatedData";
import makeFlattenedObject from "../../utils/makeFlattenedObject";
import { allowedFieldsToUpdate } from "./user.constant";
import { TUser } from "./user.interface";
import { User } from "./user.model";

/**
 * ----------------------- Create an user----------------------
 * @param payload new user data
 * @returns return newly created user
 */
const createAnUserIntoDB = async (payload: TUser) => {
  // set default password if password is not provided
  payload.password = payload.password || (config.default_password as string);

  const result = await User.create(payload);
  return result;
};

/**
 * ----------------------- get all users ----------------------
 * @return return all users
 */
const getAllUsersFromDB = async () => {
  const jwtPayload = { email: "user@gmail.com", role: "user" };
  const token = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: config.jwt_access_expires_in,
  });

  const result = await User.find({});
  return token;
};

/**
 * -----------------  get me  -----------------
 * @param role user role
 * @param id mongoose id of an user
 * @returns own user data
 */
const getMe = async (role: string, id: string) => {
  const result = await User.findOne({ _id: id, role: role });
  return result;
};

/**
 * --------------- delete an user form db ----------------
 * @param id user id
 * @returns return deleted user data
 */
const deleteUserFromDB = async (id: string) => {
  const result = await User.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
  return result;
};

/**
 * --------------- update an user form db ----------------
 * @param id user id
 * @param payload update user data
 * @returns return updated user data
 */
const updateUserIntoDB = async (id: string, payload: Partial<TUser>) => {
  // filter allowed fileds only
  const allowedFieldData = makeAllowedFieldData<TUser>(
    allowedFieldsToUpdate,
    payload
  );
  // make flattened object
  const flattenedData = makeFlattenedObject(allowedFieldData);

  const result = await User.findByIdAndUpdate(id, flattenedData, { new: true });
  return result;
};

export const UserServices = {
  createAnUserIntoDB,
  getAllUsersFromDB,
  getMe,
  deleteUserFromDB,
  updateUserIntoDB,
};
