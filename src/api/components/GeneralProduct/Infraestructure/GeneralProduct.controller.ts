import { Request, Response } from "express";
import { GeneralProductService } from "../Domain/GeneralProductService";
import { CreateGeneralProduct } from "../Application/CreateGeneralProduct";
import { GetGeneralProductsBySubcategoryId } from "../Application/GetGeneralProductsBySubcategoryId";

  

export class GeneralProductController {
    constructor(
        private service: GeneralProductService,
    ){
    }

    list = (_: Request, __: Response, ) => {
       
    }

    getById = (req: Request, res: Response, ) => {
        const {subCategoryId} = req.params
        return new GetGeneralProductsBySubcategoryId(this.service)
            .execute(subCategoryId)
            .then(generealProducts=>{
                return res.status( 200 ).json(generealProducts)
            })
            .catch(error => {
                console.log(error)
                return res.status( 400 ).json(error)
            })
        
    }

    getBySubCategoryId = (_:Request, __:Response)=>{
        
    }

    create = (req: Request, res: Response, ) => { 
        console.log({
            body: req.body,
        })
        let generalProduct = req.body
        generalProduct.price = parseFloat(req.body.price)

       return new CreateGeneralProduct(this.service)
            .execute(generalProduct)
            .then(generalProduct=>{
                return res.status(200).json(generalProduct)
            })
            .catch(error => {
                console.log(error)
                return res.status( 400 ).json(error)
            })
    }

    update = (_: Request, __: Response, ) => {
        
    }

    delete = (_: Request, __: Response, ) => {
        
    }
}