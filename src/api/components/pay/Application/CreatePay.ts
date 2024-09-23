import { PayService } from "../Domain/PayService";
import { Pay } from "../Domain/Pay";

export class CreatePay {
    constructor(private payService: PayService) { }

    execute(payment: Pay): Promise<Pay> {
        return this.payService.create(payment)
    }

}