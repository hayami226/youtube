import express from "express";
import { changePassword, editProfile, userDetail, users } from "../controllors/userControllor";
import { onlyPrivate } from "../middlewares";
import routes from "../routes"

const userRouter = express.Router();

userRouter.get(routes.editProfile, onlyPrivate, editProfile);
userRouter.get(routes.changePassword, onlyPrivate, changePassword);
userRouter.get(routes.userDetail(), userDetail);

export default userRouter;