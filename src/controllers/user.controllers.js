import UserServices from "../managers/users.manager.js";
import UserGithubServices from "../managers/users.github.manager.js";
const userService = new UserServices();
const userGithubServices = new UserGithubServices();


export default class UserController {
  
  async register(req, res) {
    
    try {  
      const user = req.body
      if (user) {
        console.log("regitro exioso del usuario" + user.email)
        res.redirect("/views");
      } else res.redirect("/views/register-error");
    } catch (error) {
      console.log(error);
    }
  };

  async login(req, res) {
    try {
      const id = req.session.passport.user
      const user = await userService.getById(id);
      console.log("login user", user);
      if (user) {
        req.session.user = user;
        req.session.email = user.email;
        req.session.password = user.password;
        res.redirect("/views/profile");
      } else res.redirect("/views/error-login");
    } catch (error) {
      console.log(error);
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

  async loginGithub(req, res) {
    try {
      const id = req.session.passport.user;
      console.log("login id loginGithub", id);
      const user = await userGithubServices.getById(id);
      console.log("login user loginGithub", user);
      if (user) {
        req.session.user = user;
        req.session.email = user.email;
        req.session.password = "sinPassword";
        res.redirect("/views/profile");
        //res.redirect("/views/profileGithub");
      } else res.redirect("/views/error-login");
    } catch (error) {
      console.log(error);
    };
  };

};

