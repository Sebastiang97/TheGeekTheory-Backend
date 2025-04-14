import { Request, Response } from "express";
import { PayerService } from "../Domain/PayerService";
import { CreatePayer } from "../Application/CreatePayer";
import { payerDTOSchema } from "./SchemaValidation/PayerSchema";
import { UpdatePayer } from "../Application/UpdatePayer";
import { GetPayersByIdUser } from "../Application/GetPayersByIdUser";
import { GetPayerById } from "../Application/GetPayerById";

export class PayerController {
    constructor(
        private service: PayerService,
    ){
    }

    list = (_: Request, __: Response, ) => {
        
    }

    getPayerByIdUser = (req: Request, res: Response, ) => {
        let user:any = req.user 
        console.log({ejem: user})
        if(user && user?.id){
            return new GetPayersByIdUser(this.service)
                .execute(user.id)
                .then(payers=>{
                    return res.status(200).json(payers)
                })
                .catch(error=>{
                    return res.status(400).json(error)
                })
        }
        return res.status(400).json({payers: []})
    }

    getById = (req: Request, res: Response, ) => {
        const {id} = req.params
        return new GetPayerById(this.service)
            .execute(id)
            .then(payer=>{
                return res.status(200).json(payer)
            })
            .catch(error=>{
                return res.status(400).json(error)
            })
            
    }

    create = (req: Request, res: Response, ) => {
        // let payer = {
        //     name: 'Sebastian',
        //     surname: 'Sanabria',
        //     email: 'sebastian97@example.com',
        //     phone: "3043998912",
        //     address: "Calle 26 sur #72c - 41 ",
        //     zipCode: "110821",
        //     detailAddress: "Conjunto Example apto 204",
        // }
        const payer = req.body
        payer.phone = payer.phone.toString()
        console.log({payer})
        const result = payerDTOSchema.safeParse(payer)
        if(!result.success){
            return res.status(400).json({error:result.error.issues})
        }
        return new CreatePayer(this.service)
            .execute(payer as any)
            .then(payer=>{
                res.status(200).json(payer)
            })
            .catch(err=>{
                console.log({err})
                res.status(400).json(err)
            })
       
    }

    update = (_: Request, res: Response, ) => {
        let payer = {
            id: "01465906-f64b-47fe-aea4-37bb4176bfb4",
            name: 'Sebastian',
            city: "Bogota D.C",
            surname: 'Sanabria',
            email: 'sebastian97@example.com',
            phone: "3043998912",
            address: "Calle 26 sur #72c - 41 ",
            zipCode: "110821",
            detailAddress: "Conjunto Example apto 204",
        }
        return new UpdatePayer(this.service)
            .execute("01465906-f64b-47fe-aea4-37bb4176bfb4", payer)
            .then(payer=>{
                res.status(200).json(payer)
            })
            .catch(err=>{
                console.log({err})
                res.status(400).json(err)
            })
        
    }

    delete = (_: Request, __: Response, ) => {
        return
    }
}