import { Category } from "../Domain/Category";
import { CategoryService } from "../Domain/CategoryService";


export class DeleteManyCategories {
    constructor(
        private service:CategoryService,
    )
    {}

    execute(categories:Category[]): Promise<boolean[]>{
        if(categories.length){
            const categoriesPromise = categories.map(async category=>{
                return this.service.deleteByProperty({
                    where: {id: category.id}
                })
            })
            return Promise.all(categoriesPromise)                        
        }
        return Promise.resolve([true])
    }
}