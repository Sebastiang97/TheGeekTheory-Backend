import { GeneralProduct } from "../../GeneralProduct/Domain/GeneralProduct";
import { Product } from "../../productIndividual/Domain/Product";
import { Pay } from "../Domain/Pay";

export class ToPay {
    constructor() { }

    execute(productsValidate: Product[], generalProducts:GeneralProduct[], payerId:string): Promise<Pay> {
        let amount: number = 0
        productsValidate.map(product =>{
            let generalproduct = generalProducts.find(generalProduct=> generalProduct.id === product.generalProductId)
            if(generalproduct){
                amount += product.quantity * generalproduct.price 
            }
        })
        console.log({productsValidate, amount})
        return new Promise((resolve,_)=>{
            resolve(
                {
                    paymentId: "",
                    description: "Compra mercado pago",
                    amount: amount,
                    state: "CREATED",
                    payerId: payerId,
                } as Pay
            )
        })
    }

}