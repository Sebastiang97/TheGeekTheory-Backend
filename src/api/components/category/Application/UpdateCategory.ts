import { Category } from "../Domain/Category";
import { CategoryService } from "../Domain/CategoryService";


export class UpdateCategory {
    constructor(private service:CategoryService)
    {}

    execute(data:any, id:string): Promise<Category>{
        return this.service.update(id, data)
    }
}