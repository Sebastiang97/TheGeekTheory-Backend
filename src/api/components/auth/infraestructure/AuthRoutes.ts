import { Router } from "express";
import { AuthController } from "./AuthController";
// import { isLoggedIn } from "./AuthMidlewares";
import passport from "passport";



export class AuthRoutes {
    static get routes(): Router {
        const router = Router();

        const authController = new AuthController()


        router.get('/google',  
            passport.authenticate('google', {
            scope:
                ['email', 'profile']
        }));

        
        router.get('/google/callback', 
            passport.authenticate('google', {
                successRedirect: 'http://localhost:5173/',
                failureRedirect: '/api/auth/google/failure'
            }));

        router.get('/facebook',  
            passport.authenticate('facebook', {
            scope:
                ['email', 'profile']
        }));

        router.get('/facebook/callback', 
            passport.authenticate('facebook', { failureRedirect: '/api/auth/facebook/failure' }),
            function(_, res) {
            // Successful authentication, redirect home.
                res.redirect('/api/auth/protected');
            }
        );

        router.get('/google/failure', authController.getFailure)
        
        router.get('/facebook/failure', authController.getFailure)

        router.get('/credencials', authController.getProtectedSimulate)

        router.use('/logout', authController.getLogout)



        return router
    }
}