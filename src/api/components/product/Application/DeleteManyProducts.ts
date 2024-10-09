import { DeleteImageByUrls } from "../../common/Application/DeleteImageByUrls";
import { DeleteManyResourceImageById } from "../../common/Application/DeleteResourceImage";
import { ResourceImageService } from "../../common/Domain/ResourceImageService";
import { Product } from "../Domain/Product";
import { ProductService } from "../Domain/ProductService";
import { DeleteProductByProperty } from "./DeleteProductByProperty";

export class DeleteManyProducts {
    constructor(
        private service:ProductService,
        private productImageService: ResourceImageService,
    )
    {}

    execute(products:Product[]): Promise<boolean[]>{
        if(products.length){
            const productsPromise = products.map(async product=>{
                if(product?.urlImage && product?.urlImage?.length){
                    const urls:string[] = product?.urlImage.map(img => img.url)
                    await new DeleteImageByUrls(this.productImageService)
                        .execute(urls)
                    await new DeleteManyResourceImageById(this.productImageService)
                       .execute(product.urlImage)
                }
                return new DeleteProductByProperty(this.service)
                    .execute({
                        where: {id: product.id}
                    })
            })
            return Promise.all(productsPromise)                        
        }
        return Promise.resolve([true])

    }
}