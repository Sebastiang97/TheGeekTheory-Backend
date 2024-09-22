import { PrintProductPay } from "../Domain/PrintProductPay";
import { PrintProductPayService } from "../Domain/PrintProductPayService";

export class GetPrintsProductsPay {
    constructor(
        private printProductPayService:PrintProductPayService,
    )
    {}

    execute(): Promise<PrintProductPay[]>{
        return this.printProductPayService.findAll({
            include: {urlImage: true}
        })
    }
}