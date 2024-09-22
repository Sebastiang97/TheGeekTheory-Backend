import { Print } from "../Domain/Print";
import { PrintService } from "../Domain/PrintService";

export class GetPrints {
    constructor(
        private printService:PrintService,
    )
    {}

    execute(): Promise<Print[]>{
        return this.printService.findAll({
            include: {urlImage: true}
        })
    }
}