import express from 'express'
import userController from '../controller/user.controller'
import passport from 'passport'
const jwt = require('jsonwebtoken');
const router = express.Router()
userController.loginWithGoogle()


function isLogged(req, res, next){
    if(req.user){
        req.session.auth = {
            ...req.user._doc
        }
        next()
    }else{
        res.send('lỗi đăng nhập')
    }
}



router.get('/google', passport.authenticate('google', { scope: ['profile', 'email']}))
router.get('/google/callback', passport.authenticate('google', { failureRedirect:'/user'}), isLogged,(req , res)=>{
    // Gửi thông tin người dùng về phía giao diện
    const user = req.session.auth;
    res.redirect(`http://localhost:8080/home`);
})
router.get('/user-info',(req, res)=>{
    console.log(req.user)
    res.json(req.session.auth)
})


export default router