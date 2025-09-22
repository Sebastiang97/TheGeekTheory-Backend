import { ColorImage } from "../Domain/ColorImage";
import { ColorImageService } from "../Domain/ColorImageService";

export class CreateColorImage {

    constructor(private colorImageService: ColorImageService){}

    execute(colorImage: ColorImage): Promise<ColorImage>{
       return this.colorImageService.create(colorImage)
    }

}