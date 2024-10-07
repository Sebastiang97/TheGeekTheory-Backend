import { Request, Response } from "express";
import { ProductService } from "../Domain/ProductService";
import { GetProducts } from "../Application/GetProducts";
import { ResourceImageService } from "../../common/Domain/ResourceImageService";
import { productDTOSchema } from "./SchemaValidation/ProductSchema";
import { CreateProduct } from "../Application/CreateProduct";
import { FileArray } from "express-fileupload";
import { CreateResourceImage } from "../../common/Application/CreateResourceImage";
import { GetProductsBySubCategoryId } from "../Application/GetProductsBySubCategoryId";
import { GetProductById } from "../Application/GetProductById";
import { DeleteProductById } from "../Application/DeleteProductById";
import { Product } from "../Domain/Product";
import { UpdateProduct } from "../Application/UpdateProduct";
import { ProductUpdateSchema } from "./SchemaValidation/ProductUpdateSchema";
  

export class ProductController {
    constructor(
        private service: ProductService,
        private imageService: ResourceImageService,
    ){
    }

    list = (_: Request, res: Response, ) => {
        new GetProducts(this.service)
            .execute()
            .then(products => {
                // let productDTO:any = products
                // productDTO.map((product:any) => {
                //     product.color = JSON.parse(product.color)
                //     product.size = JSON.parse(product.size)
                //     return product
                // })
                return res.status(200).json( products )
            })
            .catch(error => res.status( 400 ).json( { error } ))
    }

    getById = (_: Request, __: Response, ) => {
        return
    }

    getBySubCategoryId = (req:Request, res:Response)=>{
        const {subCategoryId} = req.params
        return new GetProductsBySubCategoryId(this.service)
            .execute(subCategoryId)
            .then(products => {
                // let productDTO:any = products
                // productDTO.map((product:any) => {
                //     product.color = JSON.parse(product.color)
                //     product.size = JSON.parse(product.size)
                //     product.price = parseFloat(product.price)
                //     return product
                // })
                return res.status(200).json( products )
            })
            .catch(error => res.status( 400 ).json( { error } ))
    }

    create = (req: Request, res: Response, ) => { 
        console.log({
            body: req.body,
            files: req.files
        })
        let product = req.body
        product.price = parseFloat(req.body.price)
        product.quantity = parseFloat(req.body.quantity)
        // product.color = JSON.parse(product.color)
        // product.size = JSON.parse(product.size)
        
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({error: 'No se ha encontrado ningún archivo.'})
        }
        
        const result = productDTOSchema.safeParse(product)
        if(!result.success){
            return res.status(400).json({error:result.error.issues})
        }
        
        return new GetProductsBySubCategoryId(this.service)
            .execute(product.subCategoryId)
            .then(products=>{
                
                const pdts = products.filter((pdt:any)=>{
                    // pdt.color = JSON.parse(pdt.color)
                    // pdt.size = JSON.parse(pdt.size)
                    // return pdt.color.code === product.color.code 
                    // && pdt.color.size === product.color.size 
                    return pdt.color === product.color 
                    && pdt.color === product.color 
                })

                if(pdts.length ){
                    throw new Error("El color y la talla ya existe")
                }
                
                // product.color = JSON.stringify(product.color)
                // product.size = JSON.stringify(product.size)
                return product
            }).then(product=>{
                return new CreateProduct(this.service)
                .execute(product)
            }).then(productEntity => {
                product = productEntity
                return this.imageService.uploadImages(req.files as FileArray)
            })
            .then(uploadResult => {
                return new CreateResourceImage(this.imageService)
                    .execute(uploadResult, {productId: product.id})
            })
            .then(resourceImage=>{
                product.urlImage = resourceImage
                // product.color = JSON.parse(product.color)
                // product.size = JSON.parse(product.size)
                return res.status(200).json(product)
            })
            .catch(error => {
                console.log(error)
                res.status( 400 ).json(error)
            })
        
    }

    update = (req: Request, res: Response, ) => {
        const {id} = req.params
        let product = req.body
        const result = ProductUpdateSchema.safeParse(product)
        if(!result.success){
            return res.status(400).json({error:result.error.issues})
        }
        return new UpdateProduct(this.service)
            .execute(product, id)
            .then(product =>{
                return res.status(200).json(product)
            })
            .catch(error => {
                console.log(error)
                res.status( 400 ).json(error)
            })
    }

    delete = (req: Request, res: Response, ) => {
        const {id} = req.params
        let productsBd: Product[] = []
        return new GetProductById(this.service)
            .execute(id)
            .then(products =>{
                productsBd = products
                return new DeleteProductById(this.service).
                    execute(products[0].id)
            })
            .then(_=>{
                if(productsBd[0].urlImage?.length){
                    const urls:string[] = productsBd[0].urlImage.map(img => img.url)
                    return this.imageService.deleteImages(urls)
                }
                return 
            })
            .then(_=>{
                if(productsBd[0].urlImage?.length){
                    return this.imageService.deleteAll({
                        where: {
                            productId: productsBd[0].id,
                        }
                    })
                }
                return 
            })
            .then(_=>{
                return res.status(200)
            }).catch(error => {
                console.log(error)
                res.status( 400 ).json(error)
            })
    }
}