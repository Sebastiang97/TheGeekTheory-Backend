import { Tag } from "../Domain/Tag";
import { TagService } from "../Domain/TagService";


export class GetTagByName {
    constructor(private service:TagService)
    {}

    execute(name:string): Promise<Tag[]>{
        return this.service.findByProp({
            where: {displayName: name}
        })
    }
}