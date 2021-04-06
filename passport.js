import passport from "passport";
import GithubStrategy from "passport-github";
import { githubLoginCallback } from "./controllors/userControllor";
import User from "./models/User";
import routes from "./routes";

// Strategy : 로그인 방식(username, password)
passport.use(User.createStrategy());

// 깃허브 로그인 이후 처리
passport.use(
    new GithubStrategy({
        clientID: process.env.GH_ID,
        clientSecret: process.env.GH_SECRET,
        callbackURL: `http://localhost:4000${routes.githubCallback}`
    },
    githubLoginCallback
    )
);

// 쿠키에 id를 저장
passport.serializeUser((user, done) => done(null, user));
// 쿠키에 저장한 id로 사용자 정보 찾기
passport.deserializeUser((user, done) => done(null, user));