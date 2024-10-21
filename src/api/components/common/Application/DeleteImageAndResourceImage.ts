import { ResourceImageService } from "../Domain/ResourceImageService"
import { DeleteImageByUrls } from "./DeleteImageByUrls"
import { DeleteManyResourceImageById } from "./DeleteResourceImage"

export class DeleteImageAndResourceImage {
    constructor(private service:ResourceImageService){

   }

   execute(urlImage:any):Promise<boolean[]>{
        if(urlImage.length){
            const urls:string[] = urlImage.map((img:any) => img.url)
            return new DeleteImageByUrls(this.service)
                .execute(urls)
                .then(_=>{
                    return new DeleteManyResourceImageById(this.service)
                    .execute(urlImage)
                })
        }
        return Promise.resolve([])
   }
}