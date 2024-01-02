import { Router } from "express";
import UserController from "../controllers/user.controllers.js";
import passport from "passport";


const controller = new UserController();

const router = Router();

router.post("/register",passport.authenticate('register') , controller.register);
router.post("/login",passport.authenticate('login') ,controller.login);
router.post("/logout", controller.logout);

export default router;