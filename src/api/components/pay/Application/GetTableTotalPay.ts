import { PayService } from "../Domain/PayService";
import { Pay } from "../Domain/Pay";

export class GetTableTotalPay {
    constructor(private payService: PayService) { }

    execute(): Promise<Pay[]> {
        return this.payService.findAll({
            include: {
                payer: {
                  select: {
                    email: true,
                    name: true,
                    surname: true
                  }
                }
            }
        })
    }

}