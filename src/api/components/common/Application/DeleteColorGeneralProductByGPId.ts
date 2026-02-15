import { ColorGeneralProductService } from "../Domain/ColorGeneralProductService";

export class DeleteColorGeneralProductByGPId {

    constructor(private service: ColorGeneralProductService){}

    execute(id:string): Promise<boolean>{
        return this.service.deleteByProperty({
            where: { generalProductId: id }
        })
    }
}