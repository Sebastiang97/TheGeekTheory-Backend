import { PrismaRepository } from "../../../../store/prisma/PrismaRepository";
import { BaseServiceImpl } from "./ServiceImpl/BaseServiceImpl";
import { ColorImageSize } from "../Domain/ColorImageSize";
import { ColorImageSizeService } from "../Domain/ColorImageSizeService";

export class ColorImageSizeServiceImpl extends BaseServiceImpl<ColorImageSize> implements ColorImageSizeService{

    constructor(prismaRepository: PrismaRepository<ColorImageSize>){
        super(prismaRepository)
    }

}