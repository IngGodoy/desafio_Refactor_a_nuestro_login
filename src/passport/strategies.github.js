import { Strategy as GithubStrategy } from "passport-github2";
import passport from "passport";
import UserServices from "../managers/users.github.manager.js"

const userService = new UserServices();

const strategyOptions = {
    clientID: "Iv1.22b5e9a5ad7f08fd",
    clientSecret: "008075cb6f63dd5fa82aadb994cdaecab6250689",
    callbackURL: "http://localhost:8080/users/loginGithub"
  };
 
const registerOrLogin = async (accessToken, refreshToken, profile, done) => {
  console.log("profile en passport:: ",profile);
  const email = profile._json.email;
  const user = await userService.findByEmail(email);
  console.log("verificacion user registerOrLogin::", user)
  if (user) return done(null, user);
  const newUser = await userService.register({
   first_name: profile._json.name?profile._json.name:profile.username,
   email:profile._json.email
  });
  return done(null, newUser);
};
  
passport.use("github", new GithubStrategy(strategyOptions, registerOrLogin));