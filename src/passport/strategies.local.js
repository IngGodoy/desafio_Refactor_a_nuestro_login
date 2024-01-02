import UserServices from "../managers/users.manager.js"
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

const userService = new UserServices();

const strategyOptions = {
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true,
};

//registro  
const signup = async (req, email, password, done) => {
    try {
      const user = await userService.findByEmail(email);
      if (user) return done(null, false);
      const newUser = await userService.register(req.body);
      console.log("ver user registro", newUser);
      return done(null, newUser);
    } catch (error) {
      console.log(error);
      return done(null, false);
    }
};

//login
const login = async (req, email, password, done) => {
    try {
      const userLogin = await userService.login(email, password);
      console.log("user login", userLogin)
      if (!userLogin) return done(null, false, { msg: "User not found" });
      return done(null, userLogin);
    } catch (error) {
        console.log(error);
        return done(null, false);
    };
};

const signUpStrategy = new LocalStrategy(strategyOptions, signup);
const loginStrategy = new LocalStrategy(strategyOptions, login);

//inicializar las estrategias
passport.use("register", signUpStrategy);
passport.use("login", loginStrategy);

//guarda la información en req.session.passport.user
passport.serializeUser((user, done) => {
    done(null, user._id);
  });
// hace la busqueda del user en la base de datos
passport.deserializeUser(async (id, done) => {
    const user = await userService.getById(id);
    console.log('deserialize', user);
    return done(null, user);
  });








