import { GeneralProductService } from "../Domain/GeneralProductService";


export class DeleteGeneralProduct {
    constructor(
        private service:GeneralProductService,
    )
    {}

    execute(id: string): Promise<boolean>{
        return this.service.delete(id)
    }
}