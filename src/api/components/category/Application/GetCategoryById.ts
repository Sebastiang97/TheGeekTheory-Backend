import { Category } from "../Domain/Category";
import { CategoryService } from "../Domain/CategoryService";


export class GetCategoryById {
    constructor(private categoryService:CategoryService)
    {}

    execute(id:string): Promise<Category[]>{
        return this.categoryService.findAll({
            where: {
                id,
            },
        })
    }
}