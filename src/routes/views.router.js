import { Router } from "express";


const router = Router();

router.get('/', (req, res)=>{
    res.render('login')
})

router.get('/register', (req, res)=>{
    res.render('register')
})

router.get('/profile', (req, res)=>{
    console.log("ver session", req.session.user )
    res.render('profile', { user: req.session.user})
})

router.get('/register-error', (req, res)=>{
    res.render('register-error')
})

router.get("/profileGithub", (req, res) => {
    console.log("req.user", req.user);
    const user = req.user.toObject();
    res.render("profileGithub", { user });
});

export default router;