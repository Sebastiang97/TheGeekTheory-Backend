import { PayService } from "../Domain/PayService";
import { Pay } from "../Domain/Pay";

export class GetPayById {
    constructor(private payService: PayService) { }

    execute(id:string): Promise<Pay | null> {
        return this.payService.findById(id)
    }

}