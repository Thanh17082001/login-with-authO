const GoogleStrategy = require('passport-google-oauth20').Strategy;
import userService from '../service/user.service'
import passport from 'passport';
import dotenv from 'dotenv'
dotenv.config()
class UserController{
    async loginWithGoogle(){
        try {
        passport.use(new GoogleStrategy({
            clientID: process.env.CLIENT_ID, // cau hinh ID va secret cua gg
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: "http://localhost:3000/user/google/callback"
          },
                async function(accessToken, refreshToken, profile, done) {
                    let user = await userService.findByEmail({email: profile.emails[0].value})
                    if(user){
                       return done(null, user) 
                    }
                    else{
                        const data ={
                            email:profile.emails[0].value,
                            fullName: profile.displayName,
                            provider: profile.provider,
                            avatar: profile.photos[0].value
                        }
                         user = await userService.create(data)
                        return done(null, user) 
                    }

                }
            )
        );
        
        passport.serializeUser(function(user, done) {
            // console.log("123544545434" +user)
            done(null, {user:user});
          });
          
          passport.deserializeUser(function(user, done) {
            // console.log('thienthanh' + user)
            done(null, user);
          });
        } catch (error) {
            console.log(error);
        }
        
    }

    logInSuccess(req, res, next){
        try {
            req.session.auth={
                user:{...req.user._doc},
                isLogin: true,
            }

            // console.log('thienthanh');
        res.redirect('/')
            
        } catch (error) {
            
        }
    }
}

module.exports = new UserController;