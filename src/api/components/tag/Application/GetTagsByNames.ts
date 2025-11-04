import { Tag } from "../Domain/Tag";
import { TagService } from "../Domain/TagService";

export class GetTagsByNames {
    constructor(private service:TagService)
    {}

    execute(names: string[]): Promise<Tag[]>{
        return this.service.findAll({
            where: {
                displayName: {
                  in: names
                }
            },
        })
    }
}