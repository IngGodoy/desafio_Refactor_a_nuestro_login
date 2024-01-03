import { Router } from "express";
import UserController from "../controllers/user.controllers.js";
import passport from "passport";


const controller = new UserController();

const router = Router();

router.post("/register",passport.authenticate('register') , controller.register);
router.post("/login",passport.authenticate('login') ,controller.login);
router.post("/logout", controller.logout);

 
router.get('/registerGithub', passport.authenticate('github', { scope: [ 'user:email' ] }));
//callbackURL --> es la ruta a la que redirecciona github

router.get('/profileGithub', passport.authenticate( 'github' , {
    failureRedirect: '/login', 
    successRedirect: '/profileGithub', 
    passReqToCallback: true
}));

router.get("/loginGithub",passport.authenticate("github", { scope: ["user:email"] }) ,controller.loginGithub);

export default router;