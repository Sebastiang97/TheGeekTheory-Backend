import { PrintProductPay } from "../Domain/PrintProductPay";
import { PrintProductPayService } from "../Domain/PrintProductPayService";

export class GetPrintById {
    constructor(
        private printProductPayService:PrintProductPayService,
    )
    {}

    execute(id: string): Promise<PrintProductPay[]>{
        return this.printProductPayService.findAll({
            where: {
                id: id,
            },
        })
    }
}