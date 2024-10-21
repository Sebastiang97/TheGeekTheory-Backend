import { ResourceImageService } from "../Domain/ResourceImageService"
import { DeleteImageAndResourceImage } from "./DeleteImageAndResourceImage"

export class EditResourceImage {

    constructor(private service: ResourceImageService){
        this.service
    }

    execute(urlImageDTO:any[] | undefined, urlImage:any[] | undefined): Promise<boolean[]>{
        
        urlImageDTO = Array.isArray(urlImageDTO) ? urlImageDTO : [urlImageDTO]
        
        if(urlImageDTO && urlImage && urlImageDTO.length && urlImage?.length){
            const urlImageToEdit = urlImage.filter(url=>{
                return !(urlImageDTO.some((urlDTO:any) => urlDTO === url.id))
            })
            if(urlImageToEdit.length){
                return new DeleteImageAndResourceImage(this.service)
                    .execute(urlImageToEdit)
            }
        }
        return Promise.resolve([])
    }
}