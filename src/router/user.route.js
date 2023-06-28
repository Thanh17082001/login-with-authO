import express from 'express'
const GoogleStrategy = require('passport-google-oauth20').Strategy;
import userController from '../controller/user.controller'
import passport from 'passport'
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
router.get('/', (req, res) =>{
    res.send(req.session.auth)
})

router.get('/success', (req, res) =>{
    res.send(req.user)
})

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email']}))
router.get('/google/callback', passport.authenticate('google', { failureRedirect:'/user', }), isLogged,(req , res)=>{
    res.redirect('/')
})

export default router