import { Tag } from "../Domain/Tag";
import { TagService } from "../Domain/TagService";

export class Updatetag {
    constructor(private service:TagService)
    {}

    execute(data:any, id:string): Promise<Tag>{
        return this.service.update(id, data)
    }
}