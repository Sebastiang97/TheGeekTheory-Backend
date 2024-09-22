import { Category } from "../Domain/Category";
import { CategoryService } from "../Domain/CategoryService";


export class GetCategories {
    constructor(private categoryService:CategoryService)
    {}

    execute(): Promise<Category[]>{
        return this.categoryService.findAll()
    }
}