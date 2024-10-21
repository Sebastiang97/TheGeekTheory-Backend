import { FileArray } from "express-fileupload"
import { ResourceImageService } from "../Domain/ResourceImageService"

export class CreateImageByFileArray {

    constructor(private service: ResourceImageService){}

    execute(imgs:FileArray): Promise<string[]>{
        return this.service.uploadImages(imgs)
    }
}