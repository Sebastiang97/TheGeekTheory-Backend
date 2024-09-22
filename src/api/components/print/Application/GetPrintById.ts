import { Print } from "../Domain/Print";
import { PrintService } from "../Domain/PrintService";

export class GetPrintById {
    constructor(
        private printService:PrintService,
    )
    {}

    execute(id: string): Promise<Print[]>{
        return this.printService.findAll({
            where: {
                id: id,
            },
        })
    }
}