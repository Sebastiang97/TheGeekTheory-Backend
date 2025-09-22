import { PrismaRepository } from "../../../../store/prisma/PrismaRepository";
import { BaseServiceImpl } from "../../common/Infrastructure/ServiceImpl/BaseServiceImpl";
import { Product } from "../Domain/Product";
import { ProductService } from "../Domain/ProductService";

export class ProductServiceImpl extends BaseServiceImpl<Product> implements ProductService{

    constructor(prismaRepository: PrismaRepository<Product>){
        super(prismaRepository)
    }

}