import { Product } from "../../product/Domain/Product";
import { ProductPay } from "../Domain/ProductPay";
import { ProductPayDTO } from "../Infraestructure/Resource/req/ProductPayDTO";

export class MapperProductToProductPay {
    constructor() { }

    execute(product: Product, element: ProductPayDTO, payId: string): ProductPay {


        let urlImage: any[] = product.urlImage?.length
            ? product.urlImage
            : []
        return {
            name: product.name,
            description: product.description,
            price: product.price,
            color: product.color,
            size: product.size,
            quantity: element?.quantity ? element?.quantity : 0,
            typeStamping: product.typeStamping,
            urlImage: urlImage,
            payId
        } as ProductPay



    }

}