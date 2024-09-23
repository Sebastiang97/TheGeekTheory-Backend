import { Pay } from "../Domain/Pay";
import { PayService } from "../Domain/PayService";

export class GetPays {
    constructor(private productService: PayService)
    {}

    execute(): Promise<Pay[]>{
        return this.productService.findAll()
    }
}