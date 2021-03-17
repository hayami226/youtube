import express from "express";
import { join, login, logout } from "../controllors/userControllor";
import { home, search } from "../controllors/videoControllor";
import routes from "../routes"

const globalRouter = express.Router();

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);
globalRouter.get(routes.join, join);
globalRouter.get(routes.login, login);
globalRouter.get(routes.logout, logout);

export default globalRouter;