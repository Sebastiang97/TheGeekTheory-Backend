import { ResourceImageService } from "../Domain/ResourceImageService"

export class DeleteManyResourceImageById {

    constructor(private resourceImageService: ResourceImageService){}

    execute(urlImage:any): Promise<boolean[]>{
        const imgs = urlImage.map(async (url:any)=>{
            return await this.resourceImageService.delete(url.id)
        })
        return Promise.all(imgs)
    }
}