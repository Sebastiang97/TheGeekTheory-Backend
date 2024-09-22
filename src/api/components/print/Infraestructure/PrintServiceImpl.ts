import { FileArray } from "express-fileupload";
import { PrismaRepository } from "../../../../store/prisma/PrismaRepository";
import { BaseServiceImpl } from "../../common/Infrastructure/ServiceImpl/BaseServiceImpl";
import { Print } from "../Domain/Print";
import { PrintService } from "../Domain/PrintService";
import { ImageService } from "../../../../store/images/ImageService";

export class PrintServiceImpl extends BaseServiceImpl<Print> implements PrintService{

    constructor(prismaRepository: PrismaRepository<Print>){
        super(prismaRepository)
    }


    uploadImages(files: FileArray): Promise<string[]>{
        return ImageService.uploadImages(files)
    }

}