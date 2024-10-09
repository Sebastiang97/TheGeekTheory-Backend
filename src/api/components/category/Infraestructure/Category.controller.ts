import { Request, Response } from "express";
import { CategoryService } from "../Domain/CategoryService";
import { categorySchema } from "./SchemaValidation/CategorySchema";
import { CreateCategory } from "../Application/CreateCategory";
import { GetCategories } from "../Application/GetCategories";
import { Category } from "../Domain/Category";
import { GetSubCategoriesByCategoryId } from "../../subcategory/Application/GetSubCategoriesByCategoryId";
import { SubCategoryService } from "../../subcategory/Domain/SubCategoryService";
import { ResourceImageService } from "../../common/Domain/ResourceImageService";
import { ProductService } from "../../product/Domain/ProductService";
import { GetCategoryById } from "../Application/GetCategoryById";
import { GetProductsByCategoryId } from "../../product/Application/GetProductsByCategoryId";
import { DeleteManyProducts } from "../../product/Application/DeleteManyProducts";
import { DeleteManySubCategories } from "../../subcategory/Application/DeleteManySubCategories";
import { DeleteManyCategories } from "../Application/DeleteManyCategories";


export class CategoryController {
    constructor(
        private service: CategoryService,
        private subCategoryService: SubCategoryService,
        private subResourceImageService: ResourceImageService,
        private productService: ProductService,
        private productResourceImageService: ResourceImageService
    ){
    }

    list = (_: Request, res: Response, ) => {
        new GetCategories(this.service)
            .execute()
            .then(categories => res.json( categories ))
            .catch(error => res.status( 400 ).json( { error } ))
    }

    getById = (_: Request, __: Response, ) => {
        return
    }

    create = (req: Request, res: Response, ) => {
        let category: Category = req.body
        console.log(category)
        const result = categorySchema.safeParse(category)
        if(!result.success){
            return res.status(400).json({error: 'El recurso enviado no cumple'})
        }
        
        
        return new CreateCategory(this.service)
            .execute(category)
            .then(categoryEntity => {
                return res.json(categoryEntity)
            })
            .catch(error => {
                console.log(error)                
                return res.status( 400 ).json( { error } )
            })
    }

    update = (_: Request, __: Response, ) => {
        return
        
    }

    delete = (req: Request, res: Response, ) => {
        const {id} = req.params

        return new GetProductsByCategoryId(this.productService)
            .execute(id)
            .then(products=>{
                return new DeleteManyProducts(
                    this.productService, 
                    this.productResourceImageService
                )
                .execute(products)
            })
            .then(_=>{
                return new GetSubCategoriesByCategoryId(this.subCategoryService)
                    .execute(id)
            })
            .then(subCategories=>{
                return new DeleteManySubCategories(
                    this.subCategoryService,
                    this.subResourceImageService
                )
                .execute(subCategories)
            })
            .then(_=>{
                return new GetCategoryById(this.service)
                    .execute(id)
            })
            .then(categories=>{
                return new DeleteManyCategories(this.service)
                    .execute(categories)
            })
            .then(_=>{
                return res.json( { ok:"ok" } )
            })
            .catch(error => {
                console.log({error})  
                return res.status( 400 ).json( { error } )
            })
    }
}