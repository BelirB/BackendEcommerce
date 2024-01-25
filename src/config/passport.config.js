import "dotenv/config";
import passport from "passport";
import GithubStrategy from "passport-github2";

exports.initializePassport = () => {

    passport.use('github', new GithubStrategy({
        clientID: 'Iv1.5f880618a902c579',
        clientSecret: '0667434ed8ec8f50e1fcdf1ff76bc97d28b8234d',
        callbackURL: 'http://localhost:8080/api/session/githubcallback'
    }, async (accesToken, refreshToken, profile, done)=>{
        try{
            console.log(profile)
            let user = await userService.getUserBy({email: profile._json.email})
            if (!user) {
                let newUser = {
                    first_name: profile.username,
                    last_name: profile.username,
                    email: profile._json.email,
                    password: '123'
                }
                let result = await userService.createUser(newUser)
                return done(null, result)
            }
            done(null, user)
        }catch(err){
            return done(err)
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })
    passport.deserializeUser(async (id, done) => {
        let user = await userService.getUserBy({_id: id})
        done(null, user)
    })

}