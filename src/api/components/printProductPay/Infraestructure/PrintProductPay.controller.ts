import { Request, Response } from "express";
import { printSchemaDTO } from "./SchemaValidation/PrintSchema";
// import { FileArray } from "express-fileupload";
import { ResourceImageService } from "../../common/Domain/ResourceImageService";
// import { CreateResourceImageTest } from "../../common/Application/CreateResourceImageTest";
import { PrintProductPayService } from "../Domain/PrintProductPayService";
import { GetPrintsProductsPay } from "../Application/GetPrintsProductsPay";
// import { CreatePrintProductPay } from "../Application/CreatePrintProductPay";
import { PrintProductPay } from "../Domain/PrintProductPay";
  

export class ProductController {
    constructor(
        private service: PrintProductPayService,
        private imageService: ResourceImageService,
    ){
        this.imageService
    }

    list = (_: Request, res: Response, ) => {
        return new GetPrintsProductsPay(this.service)
            .execute()
            .then(prints => {

                return res.status(200).json( prints )
            })
            .catch(error => res.status( 400 ).json( { error } ))
    }

    getById = (_: Request, __: Response, ) => {
        return
    }

    create = (req: Request, res: Response, ) => { 
        let printReq = {
            name: req.body.name,
            author: req.body.author
        }
        
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({error: 'No se ha encontrado ningún archivo.'})
        }


        const result = printSchemaDTO.safeParse({...printReq, isMain: req.body.isMain})
        if(!result.success){
            return res.status(400).json({error:result.error.issues})
        }
        let print: PrintProductPay = {} as PrintProductPay
        return print
        // return new CreatePrintProductPay(this.service)
        //     .execute(printReq as PrintProductPay)
        //     .then(newPrint=>{
        //         print = newPrint
        //         return new CreateResourceImageTest(this.imageService)
        //             .execute(
        //                 req.files as FileArray, 
        //                 {printId: print.id},
        //                 req.body.isMain
        //             )
        //     })
        //     .then(_=>{
        //         // print.urlImage = resourceImage
        //         return res.status(200).json( print )
        //     })
        //     .catch(error => {
        //         console.log(error)
        //         res.status( 400 ).json(error)
        //     })
        // return new CreatePrint(this.service)
        //     .execute(printReq)
        //     .then(newPrint=>{
        //         print = newPrint
        //         return this.service
        //             .uploadImages(req.files as FileArray)
        //     })
        //     .then(uploadResult=>{
        //         return new CreateResourceImage(this.imageService)
        //             .execute(uploadResult, {prindId: print.id})
        //     })
        //     .then(_=>{
        //         return res.status(200).json( print )
        //     })
        //     .catch(error => {
        //         console.log(error)
        //         res.status( 400 ).json(error)
        //     })
        
    }

    update = (_: Request, __: Response, ) => {
        return
        
    }

    delete = (_: Request, __: Response, ) => {
        return
    }
}