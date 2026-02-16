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
import { CreateResourceImage } from "../../common/Application/CreateResourceImage";
import { ResourceImageService } from "../../common/Domain/ResourceImageService";
import { FileArray } from "express-fileupload";
import { GetProductByGPId } from "../Application/GetProductByGPId";
import { GetProductById } from "../Application/GetProductById";
import { productIndividualUpdateSchema } from "./SchemaValidation/ProductIndividualUpdateSchema";
import { UpdateIndividualProduct } from "../Application/UpdateIndividualProduct";
import { DeleteProductById } from "../Application/DeleteProductById";
import { DeleteImageAndResourceImage } from "../../common/Application/DeleteImageAndResourceImage";
import { Product } from "../Domain/Product";
import { GET_CODE } from "../../../../utils/GetCode";


  

export class ProductIndividualController {
    constructor(
        private service: ProductService,
        private colorGeneralProductService: ColorGeneralProductService,
        private colorImageService: ColorImageService,
        private colorImageSizeService: ColorImageSizeService,
        private imageService: ResourceImageService,
        
    ){

    }

    list = (_: Request, __: Response, ) => {
        
    }

    getProductById = (req: Request, res: Response, ) => {
        const {id} = req.params
        return new GetProductById(this.service)
            .execute(id)
            .then(product=>{
                return res.status( 200 ).json(product)
            })
            .catch(error => {
                console.log(error)
                return res.status( 400 ).json(error)
            })
    }

    getProductByGPId = (req: Request, res: Response, ) => {
        const {gPId} = req.params
        return new GetProductByGPId(this.service)
            .execute(gPId)
            .then(product=>{
                return res.status( 200 ).json(product)
            })
            .catch(error => {
                console.log(error)
                return res.status( 400 ).json(error)
            })
    }

    create = (req: Request, res: Response, ) => { 
        // imgMain:Array(1)0:"blob:http://localhost:5173/5d91bc9b-e62e-420c-b585-d47c6763bd03"length:1[[Prototype]]:Array(0)
        // imgSecond:Array(2)0:"blob:http://localhost:5173/56d195a9-fb96-46c2-a03d-05c89ecca566"1:"blob:http://localhost:5173/c0b33adb-e228-402d-b33b-aaf958d40af1"length:2[[Prototype]]:Array(0)
        let product = req.body
        // product.price = parseFloat(req.body.price)
        product.quantity = parseFloat(req.body.quantity)
        product.isVisible = Boolean(product.isVisible)
        product.code = GET_CODE(req.body.title)
        let fileImgSecond: FileArray = {}
        let fileImgMain: FileArray = {}

        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({error: 'No se ha encontrado ningún archivo.'})
        }else{
            console.log({
                body: req.body,
                files: req.files,
                fileImgMain: req.files['file[imgMain]'],
                fileImgSecond: req.files['file[imgSecond]'],
                msg: "ProductIndividualController"
            })
            fileImgSecond["file"] =  req.files['file[imgSecond]']
            fileImgMain["file"] =  req.files['file[imgMain]']
             
             
            // let imagesArray: any[] = Array.isArray(req.files?.file) ? req.files.file : [req.files?.file]
            
            // imagesArray.forEach(file => {
            //     console.log({file})
            // });
        }

        
        let ColorGeneralProduct = {
            generalProductId: product.generalProductId
        }
        
        let colorImage: any = {
            color: product.color,
            image: ""
        }

        let colorImageSize:any = {
            size: product.size
        }
        
        const result = productDTOSchema.safeParse(product)
        if(!result.success){
            return res.status(400).json({error:result.error.issues})
        }
        let newProduct:any = {}
        let images: string[] = []
        return new CreateIndividualProduct(this.service)
            .execute(product)
            .then(product =>{
                newProduct = product
                console.log({product})
                return this.imageService.uploadImages(fileImgMain as FileArray)
            })
            .then(imgMain=>{
                colorImage.image = imgMain[0]
                // images = imgMain
                images = [...images, ...imgMain]
                return this.imageService.uploadImages(fileImgSecond as FileArray)
            })
            .then(uploadResult => {
                images = [...images, ...uploadResult]
                console.log({images, uploadResult})
                return new CreateResourceImage(this.imageService)
                    .execute(images, {productId: newProduct.id})
            })
            .then(resourceImage=>{
                resourceImage
                return new CreateColorGeneralProduct(this.colorGeneralProductService)
                    .execute(ColorGeneralProduct as any)
            })
            .then(colorGeneralProduct =>{
                console.log({colorGeneralProduct})
                colorImage.colorGeneralProductId = colorGeneralProduct.id
                return new CreateColorImage(this.colorImageService)
                    .execute(colorImage as any)
            })
            .then(colorImage =>{
                console.log({colorImage})
                colorImageSize.colorImageId = colorImage.id
                return new CreateColorImageSize(this.colorImageSizeService)
                    .execute(colorImageSize as any)
            })
            .then(colorImage =>{
                console.log({colorImage})
                newProduct.urlImage = images
                return res.status(200).json(newProduct)
            })
            .catch(err => {
                console.log({err}) 
                return res.status(400).json(err)
            })
        
    }
    
    update = (req: Request, res: Response, ) => {
        const {id} = req.params

        let product = {
            title: req.body.title,
            quantity: parseFloat(req.body.quantity),
            description: req.body.description,
        }
        
        const result = productIndividualUpdateSchema.safeParse(product)
        if(!result.success){
            return res.status(400).json({error:result.error.issues})
        }
        return new UpdateIndividualProduct(this.service)
            .execute(product, id)
            .then(product=>{
                return res.status( 200 ).json(product)
            })
            .catch(error => {
                console.log(error)
                return res.status( 400 ).json(error)
            })
    }

    delete = (req: Request, res: Response, ) => {
        const {id} = req.params
        let productsBd: Product[] = []
        return new GetProductById(this.service)
            .execute(id)
            .then(products =>{
                productsBd = products
                return new DeleteImageAndResourceImage(this.imageService)
                    .execute(productsBd[0]?.urlImage)
            })
            .then(_=>{
                return new DeleteProductById(this.service).
                    execute(productsBd[0].id)
            })
            .then(_=>{
                return res.json( { ok:"ok" } )
            }).catch(error => {
                console.log(error)
                res.status( 400 ).json(error)
            })
    }
}