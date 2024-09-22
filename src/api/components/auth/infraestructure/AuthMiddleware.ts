import { NextFunction, Request, Response } from "express";
import { getRepo } from "../../common/Infrastructure/GetRepo";
import { User } from "../../user/Domain/User";
import { ROLES } from "../../../constants";

export class AuthMiddleware {
    
    static hasAdmin = async (req: Request, res: Response, next: NextFunction)=>{
        let user: User = Object.keys(req.user || {}).length 
        ? req.user as User 
        : {} as User
        
        if(Object.keys(user).length){
            const UserRepository = getRepo<User>("user")
            const userEntity = await UserRepository.findById(user.id)
            
            if( userEntity?.role == ROLES.ADMIN){
                next()
            }else{
                res.status(404).json({error: "No tienes permisos para acceder a los recursos"})
            }
        }else{
            res.status(404).json({error: "No tienes permisos para acceder a los recursos"})
        }
    }
}