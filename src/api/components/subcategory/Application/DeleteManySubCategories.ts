import { DeleteImageAndResourceImage } from "../../common/Application/DeleteImageAndResourceImage";
import { ResourceImageService } from "../../common/Domain/ResourceImageService";
import { SubCategory } from "../Domain/SubCategory";
import { SubCategoryService } from "../Domain/SubCategoryService";
import { DeleteSubCategoryByProperty } from "./DeleteSubCategoryByProperty";


export class DeleteManySubCategories {
    constructor(
        private servce:SubCategoryService,
        private subImageService: ResourceImageService,

    )
    {}

    execute(subs:SubCategory[]): Promise<boolean[]>{
        if(subs.length){
            const subsPromise = subs.map(async sub=>{
                if(sub?.urlImage && sub?.urlImage?.length){
                    await new DeleteImageAndResourceImage(this.subImageService)
                        .execute(sub.urlImage)
                    // const urls:string[] = sub?.urlImage.map(img => img.url)
                    // await new DeleteImageByUrls(this.subImageService)
                    //     .execute(urls)
                    // await new DeleteManyResourceImageById(this.subImageService)
                    //    .execute(sub.urlImage)
                }
                return new DeleteSubCategoryByProperty(this.servce)
                    .execute({
                        where: {id: sub.id}
                    })
            })
            return Promise.all(subsPromise)                        
        }
        return Promise.resolve([true])
    }
}