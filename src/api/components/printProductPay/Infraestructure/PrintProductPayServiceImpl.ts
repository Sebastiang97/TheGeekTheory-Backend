import { FileArray } from "express-fileupload";
import { PrismaRepository } from "../../../../store/prisma/PrismaRepository";
import { BaseServiceImpl } from "../../common/Infrastructure/ServiceImpl/BaseServiceImpl";
import { ImageService } from "../../../../store/images/ImageService";
import { PrintProductPay } from "../Domain/PrintProductPay";
import { PrintProductPayService } from "../Domain/PrintProductPayService";

export class PrintProductPayServiceImpl extends BaseServiceImpl<PrintProductPay> implements PrintProductPayService{

    constructor(prismaRepository: PrismaRepository<PrintProductPay>){
        super(prismaRepository)
    }


    uploadImages(files: FileArray): Promise<string[]>{
        return ImageService.uploadImages(files)
    }

}