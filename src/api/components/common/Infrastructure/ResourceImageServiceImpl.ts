import { PrismaRepository } from "../../../../store/prisma/PrismaRepository";
import { BaseServiceImpl } from "./ServiceImpl/BaseServiceImpl";
import { ResourceImageService } from "../Domain/ResourceImageService";
import { ResourceImage } from "../Domain/ResourceImage";
import { ImageService } from "../../../../store/images/ImageService";
import { FileArray } from "express-fileupload";

export class ResourceImageServiceImpl extends BaseServiceImpl<ResourceImage> implements ResourceImageService{

    constructor(
        prismaRepository: PrismaRepository<ResourceImage>,
    ){
        super(prismaRepository)
    }

    uploadImages(files: FileArray): Promise<string[]>{
       return ImageService.uploadImages(files)
    }

    deleteImages(img: string[]): Promise<any> {
        return ImageService.deleteImage(img)
    }
}