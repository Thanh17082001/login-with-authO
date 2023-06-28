const GoogleStrategy = require('passport-google-oauth20').Strategy;
import userService from '../service/user.service'
import passport from 'passport';
class UserController{
    async loginWithGoogle(){
        try {
            const CLIENT_ID = "897276465364-62fqb5bdpo6qagaqsk6nmrdl1m223203.apps.googleusercontent.com"
        const CLIENT_SECRET="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"
        passport.use(new GoogleStrategy({
            clientID: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            callbackURL: "http://localhost:3000/user/google/callback"
          },
                async function(accessToken, refreshToken, profile, cb) {
                    // console.log(profile)
                    const data ={
                        email:profile.emails[0].value,
                        fullName: profile.displayName,
                        provider: profile.provider,
                        avatar: profile.photos[0].value
                    }
                    const result = await userService.create(data)
                    console.log(result)
                }
            )
        );
        
        passport.serializeUser(function(user, done){
            done(null, user.id);
        });
    
        passport.deserializeUser(function(id, done) {
            User.findById(id, function(err, user) {
                done(err, user);
            });
        });
        } catch (error) {
            console.log(error);
        }
        
    }
}

module.exports = new UserController;