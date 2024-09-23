import { Product } from "../../product/Domain/Product";
import { Pay } from "../Domain/Pay";

export class ToPay {
    constructor() { }

    execute(productsValidate: Product[], payerId:string): Promise<Pay> {
        let amount: number = 0
        productsValidate.map(product =>{
            amount += product.price * product.quantity 
        })
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