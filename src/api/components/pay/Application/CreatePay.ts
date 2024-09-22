import { PayService } from "../Domain/PayService";
import { Pay } from "../Domain/pay";

export class CreatePay {
    constructor(private payService: PayService) { }

    execute(payment: Pay): Promise<Pay> {
        return this.payService.create(payment)
    }

}