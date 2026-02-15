import { ColorGeneralProductService } from "../Domain/ColorGeneralProductService";

export class DeleteColorGeneralProductById {

    constructor(private service: ColorGeneralProductService){}

    execute(id:string): Promise<boolean>{
        return this.service.deleteByProperty({
            where: { id }
        })
    }
}