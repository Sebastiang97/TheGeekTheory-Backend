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
import { DeleteManyResourceImageById } from "../../common/Application/DeleteResourceImage";
import { DeleteSubCategoryById } from "../../subcategory/Application/DeleteSubCategoryById";
import { GetCategoryById } from "../Application/GetCategoryById";
import { Product } from "../../product/Domain/Product";
import { SubCategory } from "../../subcategory/Domain/SubCategory";


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
        let categories: Category[] = []
        let subCategoriesBd: SubCategory[] = []
        let productsBd: Product[] = []
        return new GetCategoryById(this.service)
            .execute(id)
            .then(category=>{
                categories = category
                return new GetSubCategoriesByCategoryId(this.subCategoryService)
                    .execute(id)
            })
            .then(subcategories=>{
                subCategoriesBd = subcategories
                if(subCategoriesBd && subCategoriesBd[0]?.urlImage?.length){
                    const urls:string[] = subCategoriesBd[0].urlImage.map(img => img.url)
                    return this.subResourceImageService.deleteImages(urls)
                }
                return 
            })
            .then(_=>{
                if(subCategoriesBd && subCategoriesBd[0]?.urlImage?.length){
                    return new DeleteManyResourceImageById(this.subResourceImageService)
                        .execute(subCategoriesBd[0]?.urlImage)
                }
                return 
            })
            .then(_=>{
                return new DeleteSubCategoryById(this.service)
                    .execute(id)
            })
            .then(_=>{
                return new GetProductsBySubCategoryId(this.productService)
                    .execute(id)
            })
            .then(products=>{
                productsBd = products
                if(productsBd.length && productsBd[0]?.urlImage?.length){
                    const urls:string[] = productsBd[0].urlImage.map(img => img.url)
                    return this.productImageService.deleteImages(urls)
                }
                return 
            })
            .then(_=>{
                if(productsBd.length && productsBd[0]?.urlImage?.length){
                    return new DeleteManyResourceImageById(this.imageService)
                        .execute(productsBd[0]?.urlImage)
                }
                return 
            })
            .then(_=>{
                if(productsBd.length){
                    return new DeleteProductByProperty(this.productService)
                        .execute({
                            where: {subCategoryId: id}
                        })
                }
                return 
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