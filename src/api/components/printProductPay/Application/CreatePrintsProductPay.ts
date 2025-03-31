import { PrintProductPay } from "../Domain/PrintProductPay";
import { PrintProductPayService } from "../Domain/PrintProductPayService";

export class CreatePrintsProductPay {
    constructor(
        private printProductPayService:PrintProductPayService,
    )
    {}

    async execute(print:PrintProductPay[], productPayId: string): Promise<PrintProductPay[]>{
        const res = print.map((p:any)=>{
            let printProductPay = {
                url: p.url,
                position: p.position,
                size: p.size,
                productPayId: productPayId
            }
            return this.printProductPayService.create(printProductPay as PrintProductPay)
        })
        return Promise.all(res)
    }
}