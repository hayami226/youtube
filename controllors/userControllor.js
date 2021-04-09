import passport from "passport";
import routes from "../routes";
import User from "../models/User";

export const getJoin = (req, res) => {
    res.render("join", { pageTitle:"Join" });
}

export const postJoin = async (req, res, next) => {
    const {
        body : { name, email, password, password2 }
    } = req;

    if(password !== password2) {
        res.status(400);
        res.render("join", { pageTitle:"Join" });
    } else {
        try {
            const user = await User({
                name,
                email
            });
            await User.register(user, password);
            next();
        } catch(error) {
            console.log(error);
            res.redirect(routes.home);
        }
    }
}

export const getLogin = (req, res) => {
    res.render("login", { pageTitle:"Login" });
}

export const postLogin = passport.authenticate("local", {
    failureRedirect: routes.login,
    successRedirect: routes.home
});

export const githubLogin = passport.authenticate("github");

// 안쓰는 매개변수는 _, __로 작성
export const githubLoginCallback = async (_, __, profile, cb) => {
    const {
      _json: { id, avatar_url: avatarUrl, name, email }
    } = profile;
    try {
      // 기존 user 에서 깃허브와 같은 이메일을 쓰고 있을 때 처리
      const user = await User.findOne({ email });
      if (user) {
        user.githubId = id;
        user.avatarUrl = user.avatarUrl ? user.avatarUrl : avatarUrl;
        user.name = user.name ? user.name : name;
        user.save();
        return cb(null, user); // 성공 시 error 자리에 null로
      }
      const newUser = await User.create({
        email,
        name,
        githubId: id,
        avatarUrl
      });
      return cb(null, newUser); // 성공 시 error 자리에 null로
    } catch (error) {
      return cb(error);
    }
  };

export const postGithubLogIn = (req, res) => {
    res.redirect(routes.home);
};

export const facebookLogin = passport.authenticate("facebook");

export const facebookLoginCallback = async (_, __, profile, cb) => {
    const {
      _json: { id, name, email }
    } = profile;
    try {
      const user = await User.findOne({ email });
      if (user) {
        user.facebookId = id;
        user.avatarUrl = `https://graph.facebook.com/${id}/picture?type=large`;
        user.save();
        return cb(null, user);
      }
      const newUser = await User.create({
        email,
        name,
        facebookId: id,
        avatarUrl: `https://graph.facebook.com/${id}/picture?type=large`
      });
      return cb(null, newUser);
    } catch (error) {
      return cb(error);
    }
};

export const postFacebookLogin = (req, res) => {
  res.redirect(routes.home);
};

export const logout = (req, res) => {
    req.logout();
    res.redirect(routes.home);
}

export const getMe = (req, res) => {
  console.log( req.user)
    res.render("userDetail", { pageTitle:"User Detail", user: req.user });
}

export const userDetail = async (req, res) => {
    const {
      params: { id }
    } = req;
    try {
      const user = await User.findById(id);
      user.avatarUrl = '\\' + user.avatarUrl;
      res.render("userDetail", { pageTitle: "User Detail", user });
    } catch (error) {
      res.redirect(routes.home);
    }
  };

export const getEditProfile = (req, res) => {
  res.render("editProfile", { pageTitle:"Edit Profile" });
}

export const postEditProfile = async (req, res) => {
  const {
    body: { name, email },
    file
  } = req;

  try {
    await User.findByIdAndUpdate(req.user._id, {
      name,
      email,
      avatarUrl: file ? file.path : req.user.avatarUrl
    });
    res.redirect(routes.me);
  }catch(error) {
    res.redirect(`/users/${routes.editProfile}`);
  }
}

export const getChangePassword = (req, res) => {
  res.render("changePassword", { pageTitle:"Change Password" });
}

export const postChangePassword = async (req, res) => {
  const {
    body: {
      oldPassword,
      newPassword,
      newPassword1
      }
    } = req;

  try {
    if(newPassword !== newPassword1) {
      res.status(400);
      res.redirect(`/users/${routes.changePassword}`);
      return;
    }
    await req.user.changePassword(oldPassword, newPassword1);
    res.redirect(routes.me);
  } catch(error) {
    res.redirect(`/users/${routes.changePassword}`);
  }
}