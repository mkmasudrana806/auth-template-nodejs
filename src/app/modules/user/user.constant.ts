import { TUser } from "./user.interface";

export const USER_ROLE = {
  user: "user",
  admin: "admin",
};

export const allowedFieldsToUpdate: (keyof TUser)[] = [
  "name",
  "age",
  "gender",
  "contact",
  "address",
];
