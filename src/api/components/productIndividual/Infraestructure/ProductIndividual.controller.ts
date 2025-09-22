import { Request, Response } from "express";
import { ProductService } from "../Domain/ProductService";
import { productDTOSchema } from "./SchemaValidation/ProductSchema";
import { CreateIndividualProduct } from "../Application/CreateIndividualProduct";
import { CreateColorGeneralProduct } from "../../common/Application/CreateColorGeneralProduct";
import { ColorGeneralProductService } from "../../common/Domain/ColorGeneralProductService";
import { ColorImageService } from "../../common/Domain/ColorImageService";
import { ColorImageSizeService } from "../../common/Domain/ColorImageSizeService";
import { CreateColorImage } from "../../common/Application/CreateColorImage";
import { CreateColorImageSize } from "../../common/Application/CreateColorImageSize";


  

export class ProductIndividualController {
    constructor(
        private service: ProductService,
        private colorGeneralProductService: ColorGeneralProductService,
        private colorImageService: ColorImageService,
        private colorImageSizeService: ColorImageSizeService
    ){
    }

    list = (_: Request, __: Response, ) => {
        
    }

    getById = (_: Request, __: Response, ) => {
        return
    }

    create = (req: Request, res: Response, ) => { 
        // imgMain:Array(1)0:"blob:http://localhost:5173/5d91bc9b-e62e-420c-b585-d47c6763bd03"length:1[[Prototype]]:Array(0)
        // imgSecond:Array(2)0:"blob:http://localhost:5173/56d195a9-fb96-46c2-a03d-05c89ecca566"1:"blob:http://localhost:5173/c0b33adb-e228-402d-b33b-aaf958d40af1"length:2[[Prototype]]:Array(0)
        console.log({
            body: req.body,
            files: req.files,
            msg: "ProductIndividualController"
        })
        let product = req.body
        // product.price = parseFloat(req.body.price)
        product.quantity = parseFloat(req.body.quantity)
        product.isVisible = Boolean(product.isVisible)

        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({error: 'No se ha encontrado ningún archivo.'})
        }else{
            // let imagesArray: any[] = Array.isArray(req.files?.file) ? req.files.file : [req.files?.file]
            
            // imagesArray.forEach(file => {
            //     console.log({file})
            // });
        }

        
        let ColorGeneralProduct = {
            genreralProductId: product.generalProductId
        }
        
        let colorImage = {
            color: product.color,
            image: ""
        }

        let colorImageSize = {
            size: product.size
        }
        
        const result = productDTOSchema.safeParse(product)
        if(!result.success){
            return res.status(400).json({error:result.error.issues})
        }
        let newProduct = {}
        return new CreateIndividualProduct(this.service)
            .execute(product)
            .then(product =>{
                newProduct = product
                return new CreateColorGeneralProduct(this.colorGeneralProductService)
                    .execute(ColorGeneralProduct as any)
            })
            .then(colorGeneralProduct =>{
                console.log(colorGeneralProduct)
                return new CreateColorImage(this.colorImageService)
                    .execute(colorImage as any)
            })
            .then(colorImage =>{
                console.log(colorImage)
                return new CreateColorImageSize(this.colorImageSizeService)
                    .execute(colorImageSize as any)
            })
            .then(colorImage =>{
                console.log(colorImage)
                return res.status(200).json(newProduct)
            })
            .catch(err => {
                console.log({err}) 
                return res.status(400).json(err)
            })
        
    }
    
}