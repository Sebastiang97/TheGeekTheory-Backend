import { PrismaRepository } from "../../../../store/prisma/PrismaRepository";
import { BaseServiceImpl } from "./ServiceImpl/BaseServiceImpl";
import { ProductTag } from "../Domain/ProductTag";
import { ProductTagService } from "../Domain/ProductTagService";


export class ProductTagServiceImpl extends BaseServiceImpl<ProductTag> implements ProductTagService{

    constructor(
        prismaRepository: PrismaRepository<ProductTag>,
    ){
        super(prismaRepository)
    }

   
}