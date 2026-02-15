import { ColorImageService } from "../Domain/ColorImageService";

export class DeleteColorImageByColorGPId {

    constructor(private service: ColorImageService){}

    execute(id:string): Promise<boolean>{
        return this.service.deleteByProperty({
            where: {  colorGeneralProductId: id}
        })
    }
}