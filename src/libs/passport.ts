import { Request } from 'express';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import 'dotenv/config'
import { CreateUser } from '../api/components/user/Application/CreateUser';

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            callbackURL: "/api/auth/google/callback",
            passReqToCallback: true
        },
        async function (_: Request, __: string, ___: string, profile: any, done: any) {
            new CreateUser()
                .execute(profile)
                .then(user => {
                    done(null, user)
                })
                .catch(error=> {
                    console.log(error)
                    done(null, undefined)
                })
        }
));

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user as any)
})

// passport.use(
//     new FacebookStrategy(
//         {
//             clientID: process.env.FACEBOOK_CLIENT_ID as string,
//             clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
//             callbackURL: "http://localhost:3000/api/auth/facebook/callback",
//             passReqToCallback: true
//         },
//         function (_: Request, __: string, ___: string, profile: any, done: any) {
//             // console.log({
//                 // accessToken, refreshToken, profile, env: "pass16"
//             // })
//             done(null, profile)
//         }
// ));




export default passport