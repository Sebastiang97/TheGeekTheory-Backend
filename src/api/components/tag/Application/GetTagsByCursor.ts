import { Tag } from "../Domain/Tag";
import { TagService } from "../Domain/TagService";


export class GetTagsByCursor {
  constructor(private service: TagService) { }

  execute(query: any): Promise<Tag[]> {
    

    return this.service.findAll({
      ...query
    })
  }
}