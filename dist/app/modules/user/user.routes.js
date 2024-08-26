"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_validation_1 = require("./user.validation");
const router = express_1.default.Router();
// create an user
router.post("/create-user", (0, validateRequest_1.default)(user_validation_1.UserValidations.createUserValidationsSchema), user_controller_1.UserControllers.createAnUser);
// get all users
router.get("/", user_controller_1.UserControllers.getAllUsers);
// get me route (get single user)
router.get("/getMe", user_controller_1.UserControllers.getMe);
// delete an user
router.delete("/:id", user_controller_1.UserControllers.deleteUser);
// update an user
router.patch("/:id", (0, validateRequest_1.default)(user_validation_1.UserValidations.updateUserValidationsSchema), user_controller_1.UserControllers.updateUser);
exports.UserRoutes = router;
