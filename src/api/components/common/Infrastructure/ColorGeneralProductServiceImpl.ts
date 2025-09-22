import { PrismaRepository } from "../../../../store/prisma/PrismaRepository";
import { BaseServiceImpl } from "./ServiceImpl/BaseServiceImpl";
import { ColorGeneralProduct } from "../Domain/ColorGeneralProduct";
import { ColorGeneralProductService } from "../Domain/ColorGeneralProductService";

export class ColorGeneralProductServiceImpl extends BaseServiceImpl<ColorGeneralProduct> implements ColorGeneralProductService{

    constructor(prismaRepository: PrismaRepository<ColorGeneralProduct>){
        super(prismaRepository)
    }

}