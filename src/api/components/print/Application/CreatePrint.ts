import { Print } from "../Domain/Print";
import { PrintService } from "../Domain/PrintService";

export class CreatePrint {
    constructor(
        private printService:PrintService,
    )
    {}

    async execute(print:Print): Promise<Print>{
        return this.printService.create(print)
    }
}