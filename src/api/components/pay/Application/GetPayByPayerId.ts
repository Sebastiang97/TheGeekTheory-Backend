import { PayService } from "../Domain/PayService";
import { Pay } from "../Domain/Pay";

export class GetPayByPayerId {
    constructor(private payService: PayService) { }

    execute(payerId:string, options?:any): Promise<Pay[]> {
        return this.payService.findByProp({
            ...options,
            where: {payerId},
            include: {
                productsPay: {
                    include: {
                      urlImage: true, // Incluir las urlImage de ProductPay
                      printProductPay: true, // Incluir las urlImage de ProductPay
                    }
                }
            }
        })
    }

}