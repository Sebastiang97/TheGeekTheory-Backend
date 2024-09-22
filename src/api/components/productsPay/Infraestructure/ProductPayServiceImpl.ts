import { PrismaRepository } from "../../../../store/prisma/PrismaRepository";
import { BaseServiceImpl } from "../../common/Infrastructure/ServiceImpl/BaseServiceImpl";
import { ProductPay } from "../Domain/ProductPay";
import { ProductPayService } from "../Domain/ProductPayService";


export class ProductPayServiceImpl extends BaseServiceImpl<ProductPay> implements ProductPayService{

    constructor(prismaRepository: PrismaRepository<ProductPay>){
        super(prismaRepository)
    }

}

