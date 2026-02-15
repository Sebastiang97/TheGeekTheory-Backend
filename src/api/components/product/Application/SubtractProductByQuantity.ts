import { Product } from "../../productIndividual/Domain/Product";
import { ProductPay } from "../../productsPay/Domain/ProductPay";


export class SubtractProductByQuantity {
    constructor()
    {}

    execute(product: Product[], productPay: ProductPay[]): Product[]{
        const updatedProductArray = product.map(p => ({ ...p }));
  
        for (const pp of productPay) {
            const productToUpdateIndex = updatedProductArray.findIndex(p => p.id === pp.productId);
    
            if (productToUpdateIndex !== -1) {
                updatedProductArray[productToUpdateIndex].quantity -= pp.quantity;
            } 
        }
    
        return updatedProductArray;
    }
}
