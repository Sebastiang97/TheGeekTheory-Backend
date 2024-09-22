import { PrintProductPay } from "../Domain/PrintProductPay";
import { PrintProductPayService } from "../Domain/PrintProductPayService";

export class CreatePrintProductPay {
    constructor(
        private printProductPayService:PrintProductPayService,
    )
    {}

    async execute(print:PrintProductPay): Promise<PrintProductPay>{
        return this.printProductPayService.create(print)
    }
}