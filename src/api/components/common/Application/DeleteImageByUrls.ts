import { ResourceImageService } from "../Domain/ResourceImageService"

export class DeleteImageByUrls {

    constructor(private resourceImageService: ResourceImageService){}

    execute(urls:string[]): Promise<any[]>{
        return this.resourceImageService.deleteImages(urls)
    }
}