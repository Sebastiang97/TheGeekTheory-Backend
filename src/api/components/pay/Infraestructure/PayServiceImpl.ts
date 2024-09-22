import { PrismaRepository } from "../../../../store/prisma/PrismaRepository";
import { BaseServiceImpl } from "../../common/Infrastructure/ServiceImpl/BaseServiceImpl";
import { Pay } from "../Domain/pay";
import { PayService } from "../Domain/PayService";

export class PayServiceImpl extends BaseServiceImpl<Pay> implements PayService{

    constructor(prismaRepository: PrismaRepository<Pay>){
        super(prismaRepository)
    }

}

