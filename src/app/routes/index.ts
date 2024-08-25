import express from "express";
import { UserRoutes } from "../modules/user/user.routes";
const router = express.Router();

// user
router.use("/users", UserRoutes);

export const ApiRoutes = router;
