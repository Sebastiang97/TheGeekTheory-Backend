import { Payer } from "../Domain/Payer";
import { PayerService } from "../Domain/PayerService";

export class GetPayerById {
    constructor(private payerService:PayerService)
    {}

    execute(id: string): Promise<Payer | null>{
        return this.payerService.findById(id)
    }
}