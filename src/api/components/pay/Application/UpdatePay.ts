import { PayService } from "../Domain/PayService";
import { Pay } from "../Domain/pay";
// import { PaymentResponse } from "mercadopago/dist/clients/payment/commonTypes";

export class UpdatePay {
    constructor(private payService: PayService) { }

    execute(payment: Pay): Promise<Pay> {
        return this.payService.update(payment.id, payment)
    }

}