import { FileArray, UploadedFile } from "express-fileupload"
import { ResourceImage } from "../Domain/ResourceImage"
import { ResourceImageService } from "../Domain/ResourceImageService"
import { ImageService } from "../../../../store/images/ImageService"

export class CreateResourceImageTest {

    constructor(
        private resourceImageService: ResourceImageService
    ){}

    execute(
        files: FileArray, 
        conectId:{[x:string]:string},
        isMainImage: string
    ): Promise<ResourceImage[]>{
        let imagesArray: UploadedFile[] = Array.isArray(files?.file) ? files.file : [files?.file]
        const imgs = imagesArray.map(async (img)=> {
            let image = await ImageService.uploadedFile(img)
            let resourceImage: ResourceImage = {} as ResourceImage
            resourceImage.url = image 
            resourceImage.isMain = img.name === isMainImage ? true : false
            resourceImage = {
                ...conectId,
                ...resourceImage
            }
            const objImages = await this.resourceImageService.create(resourceImage)
            return objImages
        })
        return Promise.all(imgs)
    }
}