import { PrismaRepository } from "../../../../store/prisma/PrismaRepository";
import { BaseServiceImpl } from "../../common/Infrastructure/ServiceImpl/BaseServiceImpl";
import { SubCategoryService } from "../Domain/SubCategoryService";
import { SubCategory } from "../Domain/SubCategory";

export class SubCategoryServiceImpl extends BaseServiceImpl<SubCategory> implements SubCategoryService{

    constructor(prismaRepository: PrismaRepository<SubCategory>){
        super(prismaRepository)
    }

}