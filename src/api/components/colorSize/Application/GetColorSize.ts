import { ColorSize } from "../Domain/ColorSize";
import { ColorSizeService } from "../Domain/ColorSizeService";


export class GetProducts {
    constructor(private colorSizeService:ColorSizeService)
    {}

    execute(): Promise<ColorSize[]>{
        return this.colorSizeService.findAll()
    }
}