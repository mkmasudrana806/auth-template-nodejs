import express from "express";
import { UserControllers } from "./user.controller";
import validateRequestData from "../../middlewares/validateRequest";
import { UserValidations } from "./user.validation";
const router = express.Router();

// create an user
router.post(
  "/create-user",
  validateRequestData(UserValidations.createUserValidationsSchema),
  UserControllers.createAnUser
);

export const UserRoutes = router;
