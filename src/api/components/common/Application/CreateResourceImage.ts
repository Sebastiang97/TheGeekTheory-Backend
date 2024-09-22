import { ResourceImage } from "../Domain/ResourceImage"
import { ResourceImageService } from "../Domain/ResourceImageService"

export class CreateResourceImage {

    constructor(private resourceImageService: ResourceImageService){}

    execute(imagesUpload: string[], conectId:{[x:string]:string}): Promise<ResourceImage[]>{
        const imgs = imagesUpload.map(async img=> {
            let resourceImage: ResourceImage = {} as ResourceImage
            resourceImage.url = img 
            resourceImage.isMain = false 
            resourceImage = {
                ...conectId,
                ...resourceImage
            }
            const objImages = await this.resourceImageService.create(resourceImage)
            return objImages
        })
        return Promise.all(imgs)
    }

    executeWithResourceImage(imagesUpload: ResourceImage[], conectId:{[x:string]:string}): Promise<ResourceImage[]>{
        const imgs = imagesUpload.map(async img=> {
            let resourceImage: any = {} as any
            resourceImage = {
                url: img.url,
                isMain: img.isMain,
                ...conectId,
            }
            const objImages = await this.resourceImageService.create(resourceImage)
            return objImages
        })
        return Promise.all(imgs)
    }
}