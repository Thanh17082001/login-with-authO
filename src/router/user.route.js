import express from 'express'
const GoogleStrategy = require('passport-google-oauth20').Strategy;
import userController from '../controller/user.controller'
import passport from 'passport'
const router = express.Router()

router.get('/', (req, res) =>{
    res.send('User Pages')
})

userController.loginWithGoogle()


router.get('/google', passport.authenticate('google', { scope: ['profile', 'email']}))
router.get('/google/callback', passport.authenticate('google', { failureRedirect:'/' }), (req, res) => {
    res.redirect('/')
})

export default router