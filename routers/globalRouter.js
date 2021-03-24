import express from "express";
import { getJoin, postJoin, getLogin, postLogin, logout } from "../controllors/userControllor";
import { home, search } from "../controllors/videoControllor";
import routes from "../routes"

const globalRouter = express.Router();

globalRouter.get(routes.join, getJoin);
globalRouter.post(routes.join, postJoin);

globalRouter.get(routes.login, getLogin);
globalRouter.post(routes.login, postLogin);

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);
globalRouter.get(routes.logout, logout);

export default globalRouter;