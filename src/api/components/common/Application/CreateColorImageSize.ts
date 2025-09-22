import { ColorImageSize } from "../Domain/ColorImageSize";
import { ColorImageSizeService } from "../Domain/ColorImageSizeService";

export class CreateColorImageSize {

    constructor(private colorImageSizeService: ColorImageSizeService){}

    execute(colorImageSize: ColorImageSize): Promise<ColorImageSize>{
       return this.colorImageSizeService.create(colorImageSize)
    }

}