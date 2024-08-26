import express from "express";
import { UserControllers } from "./user.controller";
import validateRequestData from "../../middlewares/validateRequest";
import { UserValidations } from "./user.validation";
import auth from "../../middlewares/auth";
const router = express.Router();

// create an user
router.post(
  "/create-user",
  auth("admin", "user"),
  validateRequestData(UserValidations.createUserValidationsSchema),
  UserControllers.createAnUser
);

// get all users
router.get("/", UserControllers.getAllUsers);

// get me route (get single user)
router.get("/getMe", UserControllers.getMe);

// delete an user
router.delete("/:id", UserControllers.deleteUser);

// update an user
router.patch(
  "/:id",
  validateRequestData(UserValidations.updateUserValidationsSchema),
  UserControllers.updateUser
);

export const UserRoutes = router;
