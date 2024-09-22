import { Request, Response } from "express";
import { ProductPayService } from "../Domain/ProductPayService";
import { GetProductPayByPayId } from "../Application/GetProductPayByPayId";



export class ProductPayController {
    constructor(
        private service: ProductPayService,
    ){
    }

    list = (_: Request, __: Response, ) => {
        
    }

    getByPayId = (req: Request, res: Response) => {
        const {payId} = req.params
        return new GetProductPayByPayId(this.service)
            .execute(payId)
            .then(productByPay =>{
                res.status(200).json(productByPay)
            }).catch(err => {
                res.status(400).json(err)
            })
    }

    getById = (_: Request, __: Response, ) => {
        return
    }

    getBySubCategoryId = (_:Request, __:Response)=>{
       
    }

    create = (_: Request, __: Response, ) => {
        
    }

    update = (_: Request, __: Response, ) => {
        return
        
    }

    delete = (_: Request, __: Response, ) => {
        return
    }
}