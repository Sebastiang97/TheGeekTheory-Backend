import { Payer } from "../Domain/Payer";
import { PayerService } from "../Domain/PayerService";

export class CreatePayer {
    constructor(private payerService: PayerService)
    {}

    execute(payer: Payer): Promise<Payer>{
        return this.payerService.create(payer)
    }

}