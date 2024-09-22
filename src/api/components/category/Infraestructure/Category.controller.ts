import { Request, Response } from "express";
import { CategoryService } from "../Domain/CategoryService";
import { categorySchema } from "./SchemaValidation/CategorySchema";
import { CreateCategory } from "../Application/CreateCategory";
import { GetCategories } from "../Application/GetCategories";
import { Category } from "../Domain/Category";


export class CategoryController {
    constructor(
        private service: CategoryService,
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

    delete = (_: Request, __: Response, ) => {
        return
    }
}