import { Product } from "../../product/Domain/Product";
import { Items } from "mercadopago/dist/clients/commonTypes"

export class MapperProductToItemsMP {
    constructor(    )
    {}

    execute(productsBd:Product[]): Promise<Items[]>{
        return new Promise((resolve, _)=>{
            let itemsMp: Items[] = []
            productsBd.map(pro=>{
                console.log( {type: typeof pro.price, price: pro.price})
                itemsMp.push({
                    id: pro.id,
                    title: pro.name,
                    description: pro.description,
                    picture_url: pro.urlImage?.length ? pro.urlImage[0].url : "",
                    category_id: "",
                    quantity: pro.quantity,
                    currency_id: "COP",
                    unit_price: 15000,
                })
            })
            
            resolve(itemsMp)
            
        })
    }

}