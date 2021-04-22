import passport from "passport";
import GithubStrategy from "passport-github";
import FacebookStrategy from "passport-facebook";
import { facebookLoginCallback, githubLoginCallback } from "./controllors/userControllor";
import User from "./models/User";
import routes from "./routes";

// Strategy : 로그인 방식(username, password)
passport.use(User.createStrategy());

// 깃허브 로그인 이후 처리
passport.use(
    new GithubStrategy({
        clientID: process.env.GH_ID,
        clientSecret: process.env.GH_SECRET,
        callbackURL: process.env.PRODUCTION
        ? `https://shrouded-wave-62913.herokuapp.com${routes.githubCallback}`
        : `http://localhost:4000${routes.githubCallback}`
    },
    githubLoginCallback
    )
);

passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FB_ID,
        clientSecret: process.env.FB_SECRET,
        callbackURL: `http://localhost:4000${routes.facebookCallback}`,
        profileFields: ["id", "displayName", "photos", "email"],
        scope: ["public_profile", "email"]
      },
      facebookLoginCallback
    )
  );

// 쿠키에 id를 저장
passport.serializeUser((user, done) => done(null, user));
// 쿠키에 저장한 id로 사용자 정보 찾기
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
  });