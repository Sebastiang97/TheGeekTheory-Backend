import { PrismaRepository } from "../../../../store/prisma/PrismaRepository";
import { BaseServiceImpl } from "./ServiceImpl/BaseServiceImpl";
import { ColorImage } from "../Domain/ColorImage";
import { ColorImageService } from "../Domain/ColorImageService";

export class ColorImageServiceImpl extends BaseServiceImpl<ColorImage> implements ColorImageService{

    constructor(prismaRepository: PrismaRepository<ColorImage>){
        super(prismaRepository)
    }

}