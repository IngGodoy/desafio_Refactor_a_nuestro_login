import { response } from "express"; //revisar
import UserServices from "../managers/users.manager.js";
const userService = new UserServices();

export default class UserController {
  
  async register(req, res, next) {
    console.log(req.body);
    try {
      const user = await userService.register(req.body);
      if (user) res.redirect("/views");
      else res.redirect("/views/register-error");
    } catch (error) {
      next(error);
    }
  }
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await userService.login(email, password);
      console.log("login user", user);
      if (user) {
        req.session.user = user;
        req.session.email = email;
        req.session.password = password;
        res.redirect("/views/profile");
      } else res.redirect("/views/error-login");
    } catch (error) {
      next(error);
    }
  }

  async logout (req, res) {
    req.session.destroy((err) => {
        if (err) {
          console.error('Error al cerrar sesión:', err);
          return res.redirect('/error');
        }
        res.clearCookie('connect.sid');
        res.redirect("/views");
    });
};

}

