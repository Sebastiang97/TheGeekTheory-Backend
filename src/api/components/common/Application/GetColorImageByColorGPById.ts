import { ColorImage } from "../Domain/ColorImage";
import { ColorImageService } from "../Domain/ColorImageService";


export class GetColorImageByColorGPById {
    constructor(private service:ColorImageService)
    {}

    execute(coloGPId: string): Promise<ColorImage[]>{
        return this.service.findAll({
            where: {
                colorGeneralProductId: coloGPId,
            },
          })
    }
}