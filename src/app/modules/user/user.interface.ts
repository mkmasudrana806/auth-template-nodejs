export type TUserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

// user type
export type TUser = {
  name: TUserName;
  email: string;
  password: string;
  age: number;
  gender: "male" | "female" | "others";
  contact: string;
  address: string;
  role: "user" | "admin";
  status: "active" | "blocked";
  isDeleted: boolean;
};
