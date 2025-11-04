import { Tag } from "../Domain/Tag";
import { TagService } from "../Domain/TagService";


export class CreateTag {
    constructor(
        private service:TagService,
    )
    {}

    async execute(tag:Tag): Promise<Tag>{
        return  this.service.create(tag)
    }
}