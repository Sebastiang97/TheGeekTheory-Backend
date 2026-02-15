import { Product } from "../../productIndividual/Domain/Product"

export class ValidateProducts {
    constructor(    )
    {}

    execute(productsBd:Product[], ids:string[]): Promise<Product[]>{
        return new Promise((resolve, reject)=>{
            if (productsBd.length !== ids.length) {
                reject("los elementos no coinciden")
            }
            return resolve(productsBd)
        })
    }

}