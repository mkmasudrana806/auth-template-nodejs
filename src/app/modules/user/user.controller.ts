import zod from "zod";
import { NextFunction, Request, Response } from "express";
import { UserServices } from "./user.service";
import { UserValidations } from "./user.validation";

// ------------------- create an user -------------------
const createAnUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { password, user } = req.body;
    console.log(user);
    const result = await UserServices.createAnUserIntoDB(password, user);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const UserControllers = {
  createAnUser,
};
