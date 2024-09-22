import { PrismaClient } from "@prisma/client";
import { User } from "../Domain/User";

export const database = new PrismaClient()

export class CreateUser {
    constructor()
    {}

    async execute(profile: any): Promise<User>{
        
        let user = await database.user.findFirst({
            where: {
                googleId: profile.id
            },
        })

        if(user){
            return user
        }else{
            let newUser = await database.user.create({
                data: {
                    name: profile.displayName,
                    firstName: profile.given_name,
                    lastName: profile.family_name,
                    email: profile.email,
                    picture: profile.picture,
                    googleId: profile.id,
                }
            })
            return newUser
        } 
    }
}