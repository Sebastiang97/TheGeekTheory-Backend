import { Tag } from "../Domain/Tag";
import { TagService } from "../Domain/TagService";


export class DeleteManyTags {
    constructor(
        private service:TagService,
    )
    {}

    execute(tags:Tag[]): Promise<boolean[]>{
        if(tags.length){
            const tagsPromise = tags.map(async Tag=>{
                return this.service.deleteByProperty({
                    where: {id: Tag.id}
                })
            })
            return Promise.all(tagsPromise)                        
        }
        return Promise.resolve([true])
    }
}