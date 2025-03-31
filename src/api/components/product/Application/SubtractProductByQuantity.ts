import { ProductPay } from "../../productsPay/Domain/ProductPay";
import { Product } from "../Domain/Product";


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
