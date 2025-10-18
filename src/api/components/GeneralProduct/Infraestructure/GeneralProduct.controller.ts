import { Request, Response } from "express";
import { GeneralProductService } from "../Domain/GeneralProductService";
import { CreateGeneralProduct } from "../Application/CreateGeneralProduct";
import { GetGeneralProductsById } from "../Application/GetGeneralProductsById";
import { GetGeneralProductsBySubcategoryId } from "../Application/GetGeneralProductsBySubcategoryId";

  

export class GeneralProductController {
    constructor(
        private service: GeneralProductService,
    ){
    }

    list = (_: Request, __: Response, ) => {
       
    }

    getById = (req: Request, res: Response, ) => {
        const {id} = req.params
        return new GetGeneralProductsById(this.service)
            .execute(id)
            .then(generealProduct=>{
                return res.status( 200 ).json(generealProduct)
            })
            .catch(error => {
                console.log(error)
                return res.status( 400 ).json(error)
            })
        
    }

    getBySubCategoryId = (req: Request, res: Response)=>{
        const {subCategoryId} = req.params
        return new GetGeneralProductsBySubcategoryId(this.service)
            .execute(subCategoryId)
            .then(generalProducts=>{
                return res.status(200).json(generalProducts)
            })
            .catch(error => {
                console.log(error)
                return res.status( 400 ).json(error)
            })

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