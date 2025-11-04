import { Tag } from "../Domain/Tag";
import { TagService } from "../Domain/TagService";


export class GetTags {
    constructor(private service:TagService)
    {}

    execute(): Promise<Tag[]>{
        return this.service.findAll()
    }
}