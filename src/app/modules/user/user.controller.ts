import httpStatus from "http-status";
import { UserServices } from "./user.service";
import asyncHanlder from "../../utils/asyncHandler";
import sendResponse from "../../utils/sendResponse";

// ------------------- create an user -------------------
const createAnUser = asyncHanlder(async (req, res, next) => {
  const result = await UserServices.createAnUserIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User created successfully",
    data: result,
  });
});

// ------------------- create an user -------------------
const getAllUsers = asyncHanlder(async (req, res, next) => {
  const result = await UserServices.getAllUsersFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All users retrieved successfully",
    data: result,
  });
});

// ------------------- get me -------------------
const getMe = asyncHanlder(async (req, res, next) => {
  const result = await UserServices.getMe("user", "");

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User is retrieved successfully",
    data: result,
  });
});

// ------------------- delete an user -------------------
const deleteUser = asyncHanlder(async (req, res, next) => {
  const result = await UserServices.deleteUserFromDB(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User is deleted successfully",
    data: result,
  });
});

// ------------------- update an user -------------------
const updateUser = asyncHanlder(async (req, res, next) => {
  const result = await UserServices.updateUserIntoDB(req.params.id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User is updated successfully",
    data: result,
  });
});
export const UserControllers = {
  createAnUser,
  getAllUsers,
  getMe,
  deleteUser,
  updateUser,
};
