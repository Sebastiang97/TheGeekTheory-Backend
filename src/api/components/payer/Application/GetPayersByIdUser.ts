import { Payer } from "../Domain/Payer";
import { PayerService } from "../Domain/PayerService";

export class GetPayersByIdUser {
    constructor(private payerService:PayerService)
    {}

    execute(idUser: string): Promise<Payer[]>{
        return this.payerService.findAll({
            where: {
                idUser: idUser,
            }
        })
    }
}