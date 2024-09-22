import { Pay } from "../Domain/pay";
import { PayService } from "../Domain/PayService";

export class GetPays {
    constructor(private productService: PayService)
    {}

    execute(): Promise<Pay[]>{
        return this.productService.findAll()
    }
}