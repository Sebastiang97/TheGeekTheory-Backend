import { PrismaRepository } from "../../../../store/prisma/PrismaRepository";
import { BaseServiceImpl } from "../../common/Infrastructure/ServiceImpl/BaseServiceImpl";
import { GeneralProduct } from "../Domain/GeneralProduct";
import { GeneralProductService } from "../Domain/GeneralProductService";


export class GeneralProductServiceImpl extends BaseServiceImpl<GeneralProduct> implements GeneralProductService{

    constructor(prismaRepository: PrismaRepository<GeneralProduct>){
        super(prismaRepository)
    }

}