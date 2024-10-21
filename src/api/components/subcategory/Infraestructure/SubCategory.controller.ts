import { Request, Response } from "express";
import { SubCategoryService } from "../Domain/SubCategoryService";
import { subCategorySchema } from "./SchemaValidation/SubCategorySchemaDTO";
import { CreateSubCategory } from "../Application/CreateSubCategory";
import { GetSubCategories } from "../Application/GetSubCategories";
import { ResourceImageService } from "../../common/Domain/ResourceImageService";
import { FileArray } from "express-fileupload";
import { CreateResourceImage } from "../../common/Application/CreateResourceImage";
import { SubCategory } from "../Domain/SubCategory";
import { GetSubCategoriesById } from "../Application/GetSubCategoriesById";
import { GetSubCategoriesByCode } from "../Application/GetSubCategoriesByCode";
import { GetSubCategoriesByCategoryId } from "../Application/GetSubCategoriesByCategoryId";
import { ProductService } from "../../product/Domain/ProductService";
import { GetSubCategoryById } from "../Application/GetSubCategoryById";
import { GetProductsBySubCategoryId } from "../../product/Application/GetProductsBySubCategoryId";
import { DeleteManyProducts } from "../../product/Application/DeleteManyProducts";
import { DeleteManySubCategories } from "../Application/DeleteManySubCategories";
import { SubCategoryUpdateSchemaDTO } from "./SchemaValidation/SubCategoryUptdateSchemaDTO";
import { UpdateSubCategory } from "../Application/UpdateSubCategory";
import { SubCategoryReqUpdate } from "./resource/SubCategoryReqUpdate";
import { CreateImageByFileArray } from "../../common/Application/CreateImageByFileArray";
import { EditResourceImage } from "../../common/Application/EditResourceImage";


export class SubCategoryController {
    constructor(
        private service: SubCategoryService,
        private imageService: ResourceImageService,
        private productService: ProductService,
        private productImageService: ResourceImageService,
    ){
    }

    list = (_: Request, res: Response, ) => {
        return new GetSubCategories(this.service)
            .execute()
            .then(products => res.json( products ))
            .catch(error => res.status( 400 ).json( { error } ))
    }

    getById = (req: Request, res: Response, ) => {
        const {id} = req.params
        return new GetSubCategoriesById(this.service)
            .execute(id)
            .then(subCategories => res.json( subCategories ))
            .catch(error => res.status( 400 ).json( { error } ))
    }

    getByCode = (req: Request, res: Response, ) => {
        const {code} = req.params
        console.log({code})
        return new GetSubCategoriesByCode(this.service)
            .execute(code)
            .then(subCategories => res.json( subCategories ))
            .catch(error => res.status( 400 ).json( { error } ))
    }

    getByCategoryId = (req: Request, res: Response, ) => {
        const {categoryId} = req.params
        console.log({categoryId})
        return new GetSubCategoriesByCategoryId(this.service)
            .execute(categoryId)
            .then(subCategories => res.json( subCategories ))
            .catch(error => res.status( 400 ).json( { error } ))
    }

    create = (req: Request, res: Response, ) => {
        let subCategory: SubCategory = req.body
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({error: 'No se ha encontrado ningún archivo.'})
        }
          
        const result = subCategorySchema.safeParse(subCategory)
        if(!result.success){
            return res.status(400).json({error: result.error.issues})
        }
        
        return new CreateSubCategory(this.service)
            .execute(subCategory)
            .then(subCategoryEntity => {
                subCategory = subCategoryEntity
                return new CreateImageByFileArray(this.imageService)
                    .execute(req.files as FileArray)
            })
            .then(uploadResult => {
                return new CreateResourceImage(this.imageService)
                    .execute(uploadResult, {subCategoryId: subCategory.id})
            })
            .then(resourceImage=>{
                subCategory.urlImage = resourceImage
                return res.json(subCategory)
            })
            .catch(error => {
                console.log(error)                
                return res.status( 400 ).json( { error } )
            })
    }

    // getProducts = (req: Request, res: Response) =>{
    //     const SubCategoryId: string = req.params.SubCategoryId
    //     new GetProductsBySubCategoryId(this.SubSubCategoryProductService)
    //         .execute(SubCategoryId)
    //         .then(products => res.status(200).json(products))
    //         .catch(error => res.status( 400 ).json( { error } ))

    // }

    update = (req: Request, res: Response, ) => {
        const {id} = req.params
        let subCategoryUpdateDTO: SubCategoryReqUpdate = {
            name: req.body.name
        }
        let urlImageDTO = req.body.urlImage
        
        const result = SubCategoryUpdateSchemaDTO.safeParse(subCategoryUpdateDTO)
        if(!result.success){
            return res.status(400).json({error: result.error.issues})
        }

        let subCategoryEntity: SubCategory[] = []
        return new GetSubCategoryById(this.service)
            .execute(id)
            .then(subCategory=>{
                subCategoryEntity = subCategory
                if(subCategory.length){
                    return new UpdateSubCategory(this.service)
                        .execute(id, subCategoryUpdateDTO)
                }
                return {}
            })
            .then(_ => {
                return new EditResourceImage(this.imageService)
                    .execute(urlImageDTO, subCategoryEntity[0].urlImage)
            })
            .then(_=>{
                if(req.files && Object.keys(req.files).length && subCategoryEntity.length){
                    return new CreateImageByFileArray(this.imageService)
                        .execute(req.files as FileArray)
                }
                return []
            })
            .then(uploadResult => {
                if(uploadResult.length){
                    return new CreateResourceImage(this.imageService)
                    .execute(uploadResult, {subCategoryId: id})
                }
                return []
            })
            .then(_=>{
                return res.json(subCategoryEntity)
            })
            .catch(error => {
                console.log(error)                
                return res.status( 400 ).json( { error } )
            })
    }

    delete = (req: Request, res: Response, ) => {
        const {id} = req.params
        return new GetProductsBySubCategoryId(this.productService)
            .execute(id)
            .then(products=>{
                return new DeleteManyProducts(
                    this.productService, 
                    this.productImageService
                )
                .execute(products)
            })
            .then(_=>{
                return new GetSubCategoryById(this.service)
                    .execute(id)
            })
            .then(subCategories=>{
                return new DeleteManySubCategories(
                    this.service,
                    this.imageService
                )
                .execute(subCategories)
            })
            .then(_=>{
                return res.json( { ok:"ok" } )
            })
            .catch(error => {
                console.log({error})  
                return res.status( 400 ).json( { error } )
            })
        // return new GetSubCategoryById(this.service)
        //     .execute(id)
        //     .then(subcategories=>{
        //         subCategoriesBd = subcategories
        //         if(subCategoriesBd && subCategoriesBd[0]?.urlImage?.length){
        //             const urls:string[] = subCategoriesBd[0].urlImage.map(img => img.url)
        //             return this.imageService.deleteImages(urls)
        //         }
        //         return 
        //     })
        //     .then(_=>{
        //         if(subCategoriesBd && subCategoriesBd[0]?.urlImage?.length){
        //             return new DeleteManyResourceImageById(this.imageService)
        //                 .execute(subCategoriesBd[0]?.urlImage)
        //         }
        //         return 
        //     })
        //     .then(_=>{
        //         return new DeleteSubCategoryById(this.service)
        //             .execute(id)
        //     })
        //     .then(_=>{
        //         return new GetProductsBySubCategoryId(this.productService)
        //             .execute(id)
        //     })
        //     .then(products=>{
        //         productsBd = products
        //         if(productsBd.length && productsBd[0]?.urlImage?.length){
        //             const urls:string[] = productsBd[0].urlImage.map(img => img.url)
        //             return this.productImageService.deleteImages(urls)
        //         }
        //         return 
        //     })
        //     .then(_=>{
        //         if(productsBd.length && productsBd[0]?.urlImage?.length){
        //             return new DeleteManyResourceImageById(this.imageService)
        //                 .execute(productsBd[0]?.urlImage)
        //         }
        //         return 
        //     })
        //     .then(_=>{
        //         if(productsBd.length){
        //             return new DeleteProductByProperty(this.productService)
        //                 .execute({
        //                     where: {subCategoryId: id}
        //                 })
        //         }
        //         return 
        //     })
        //     .then(_=>{
        //         return res.json( { ok:"ok" } )
        //     })
        //     .catch(error => {
        //         console.log({error})  
        //         return res.status( 400 ).json( { error } )
        //     })
           
    }
}