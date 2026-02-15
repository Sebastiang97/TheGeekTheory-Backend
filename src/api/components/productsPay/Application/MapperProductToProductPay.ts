import { GeneralProduct } from "../../GeneralProduct/Domain/GeneralProduct";
import { Product } from "../../productIndividual/Domain/Product";
import { ProductPay } from "../Domain/ProductPay";
import { ProductPayDTO } from "../Infraestructure/Resource/req/ProductPayDTO";

export class MapperProductToProductPay {
    constructor() { }

    execute(
        product: Product,
        element: ProductPayDTO, 
        payId: string,
        generalProducts: GeneralProduct[]
    ): ProductPay {

        let generalproduct = generalProducts.find(generalProduct=> generalProduct.id === product.generalProductId)

        let urlImage: any[] = product.urlImage?.length
            ? product.urlImage
            : []
        return {
            name: product.title,
            description: product.description,
            price: generalproduct?.price,
            color: product.color,
            size: product.size,
            quantity: element?.quantity ? element?.quantity : 0,
            typeStamping: product.typeStamping,
            urlImage: urlImage,
            payId
        } as ProductPay



    }

}