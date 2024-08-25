 
import config from "../../config";
import { TUser } from "./user.interface";
import { User } from "./user.model";

// ----------------------- Create an user----------------------
const createAnUserIntoDB = async (password: string, payload: TUser) => {
  payload.password = password || (config.default_password as string);
  const result = await User.create(payload);
  return result;
};

export const UserServices = {
  createAnUserIntoDB,
};
