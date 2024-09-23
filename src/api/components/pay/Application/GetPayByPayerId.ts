import { PayService } from "../Domain/PayService";
import { Pay } from "../Domain/Pay";

export class GetPayByPayerId {
    constructor(private payService: PayService) { }

    execute(payerId:string): Promise<Pay | null> {
        return this.payService.findByProp({
            where: {payerId}
        })
    }

}