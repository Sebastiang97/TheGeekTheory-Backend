import { PrismaRepository } from "../../../../store/prisma/PrismaRepository";
import { BaseServiceImpl } from "../../common/Infrastructure/ServiceImpl/BaseServiceImpl";
import { Payer } from "../Domain/Payer";
import { PayerService } from "../Domain/PayerService";

export class PayerServiceImpl extends BaseServiceImpl<Payer> implements PayerService{

    constructor(prismaRepository: PrismaRepository<Payer>){
        super(prismaRepository)
    }

}

