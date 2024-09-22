import { Request, Response } from "express";
import { UserService } from "../Domain/UserService";
import { UpdateUser } from "../Application/UpdateUser";
import { usersSchema } from "./SchemaValidation/UserSchema";
import { GetUsers } from "../Application/GetUsers";
// import { transporter } from "../../../../store/email/mailer";
// import { HTML } from "./templateHTML";

export class UserController {
    constructor(
        private service: UserService,
    ){
    }

    list = async (_: Request, res: Response, ) => {
        // try {
            
        //     const info = await transporter.sendMail({
        //         from: 'The Geek Theory <ssebastiang97@gmail.com>', // sender address
        //         to: "jacksanabria17@gmail.com", // list of receivers
        //         subject: "Hello ✔", // Subject line
        //         text: "Hello world?", // plain text body
        //         html: HTML, 
        //       });
        //     console.log(info)
        // } catch (error) {
        //     console.log({error}) 
        // }
        return new GetUsers(this.service)
            .execute()
            .then(users =>{
                return res.status(200).json(users)
            })
            .catch(error=>{
                return res.status(400).json(error)
            })
    }

    getById = (_: Request, __: Response, ) => {
        return
    }

    create = (_: Request, __: Response, ) => {

    }

    getProducts = (_: Request, __: Response) =>{

    }

    update = (req: Request, res: Response) => {
        // return res.status(200).json({msg: "asdf"})

        const users = req.body
        const result = usersSchema.safeParse(users)
        if(!result.success){
            return res.status(400).json({error: 'El recurso enviado no cumple'})
        }
        return new UpdateUser(this.service)
            .execute(users)
            .then(usersEntity =>{
               return res.status(200).json(usersEntity)
            })
            .catch(error=>{
                console.log({error})
                return res.status(404).json({error})
            })
    }

    delete = (_: Request, __: Response, ) => {
        return
    }
}