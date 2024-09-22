import { PayService } from "../Domain/PayService";
import { Pay } from "../Domain/pay";

export class GetPayById {
    constructor(private payService: PayService) { }

    execute(id:string): Promise<Pay | null> {
        return this.payService.findById(id)
    }

}