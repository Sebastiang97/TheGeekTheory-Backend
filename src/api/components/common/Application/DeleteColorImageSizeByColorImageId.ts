import { ColorImageSizeService } from "../Domain/ColorImageSizeService";

export class DeleteColorImageSizeByColorImageId {

    constructor(private service: ColorImageSizeService){}

    execute(id:string): Promise<boolean>{
        return this.service.deleteByProperty({
            where: {  colorImageId: id}
        })
    }
}