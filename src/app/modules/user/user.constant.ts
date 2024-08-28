import { TUser } from "./user.interface";

export const allowedFieldsToUpdate: (keyof TUser)[] = [
  "name",
  "age",
  "gender",
  "contact",
  "address",
];
