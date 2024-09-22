import { PrismaRepository } from "../../../../store/prisma/PrismaRepository";
import { BaseServiceImpl } from "../../common/Infrastructure/ServiceImpl/BaseServiceImpl";
import { ColorSizeService } from "../Domain/ColorSizeService";
import { ColorSize } from "../Domain/ColorSize";


export class ColorSizeServiceImpl extends BaseServiceImpl<ColorSize> implements ColorSizeService{

    constructor(prismaRepository: PrismaRepository<ColorSize>){
        super(prismaRepository)
    }

}