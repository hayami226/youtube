import passport from "passport";
import User from "./models/User";

// Strategy : 로그인 방식(username, password)
passport.use(User.createStrategy());

// 쿠키에 id를 저장
passport.serializeUser(User.serializeUser());
// 쿠키에 저장한 id로 사용자 정보 찾기
passport.deserializeUser(User.deserializeUser());