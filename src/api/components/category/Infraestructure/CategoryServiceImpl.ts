import { PrismaRepository } from "../../../../store/prisma/PrismaRepository";
import { BaseServiceImpl } from "../../common/Infrastructure/ServiceImpl/BaseServiceImpl";
import { CategoryService } from "../Domain/CategoryService";
import { Category } from "../Domain/Category";

export class CategoryServiceImpl extends BaseServiceImpl<Category> implements CategoryService{

    constructor(prismaRepository: PrismaRepository<Category>){
        super(prismaRepository)
    }

}