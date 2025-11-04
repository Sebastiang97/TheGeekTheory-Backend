import { PrismaRepository } from "../../../../store/prisma/PrismaRepository";
import { BaseServiceImpl } from "../../common/Infrastructure/ServiceImpl/BaseServiceImpl";
import { TagService } from "../Domain/TagService";
import { Tag } from "../Domain/Tag";

export class TagServiceImpl extends BaseServiceImpl<Tag> implements TagService{

    constructor(prismaRepository: PrismaRepository<Tag>){
        super(prismaRepository)
    }

}