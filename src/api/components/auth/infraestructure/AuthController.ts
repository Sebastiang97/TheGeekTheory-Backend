import { Request, Response } from "express";
import passport from "passport";

export class AuthController {
    constructor() {

    }
    

    getAutenticate = (_: Request, __: Response) =>{
        passport.authenticate('google', {
            scope:
                ['email', 'profile']
        })
    }
 
    getCallback = () =>{
        passport.authenticate('google', {
            successRedirect: '/api/auth/protected',
            failureRedirect: '/api/auth/google/failure'
        })
    }

    

    getFailure = (_: Request, res: Response) =>{
        res.send("wrong")
    }

    getProtectedSimulate = (req: Request, res: Response) => {
        let user = req.user 
        console.log({user})
        // console.log({session: req.session, sessionId: req.sessionID, cookies: req.cookies})
        res.status(200).json(user)
    }

    getLogout = (req: Request, res: Response) =>{
        // console.log({session: req.session, sessionId: req.sessionID})
        req.session.destroy(()=>{})
        res.send("see youu ")
    }

        
}