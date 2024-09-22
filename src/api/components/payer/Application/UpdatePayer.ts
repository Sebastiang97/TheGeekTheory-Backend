import { Payer } from "../Domain/Payer";
import { PayerService } from "../Domain/PayerService";

export class UpdatePayer {
    constructor(private payerService: PayerService)
    {}

    execute(id:string, payer: Payer): Promise<Payer>{
        return this.payerService.update(id, payer)
    }

}