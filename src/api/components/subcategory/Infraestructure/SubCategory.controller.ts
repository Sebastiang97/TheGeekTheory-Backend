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


export class SubCategoryController {
    constructor(
        private service: SubCategoryService,
        private imageService: ResourceImageService
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
        console.log(req.files)
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
                return this.imageService.uploadImages(req.files as FileArray)
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

    update = (_: Request, __: Response, ) => {
        return
        
    }

    delete = (_: Request, __: Response, ) => {
        return
    }
}