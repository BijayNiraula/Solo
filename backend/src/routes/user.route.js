import express from "express";
import UserController from "../controller/user.controller.js";
const userRouter = express.Router();

userRouter.route("/signup").post(UserController.signup);
userRouter.route("/login").post(UserController.login);
userRouter.route("/getLoginDetail").post(UserController.getLoginDetail);
userRouter.route("/createEvent").post(UserController.createEvent);

export default userRouter;
