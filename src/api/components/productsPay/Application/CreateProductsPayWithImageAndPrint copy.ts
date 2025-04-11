// import { CreateResourceImage } from "../../common/Application/CreateResourceImage";
// import { ResourceImage } from "../../common/Domain/ResourceImage";
// import { ResourceImageService } from "../../common/Domain/ResourceImageService";
// import { CreatePrintProductPay } from "../../printProductPay/Application/CreatePrintProductPay";
// import { PrintProductPay } from "../../printProductPay/Domain/PrintProductPay";
// import { PrintProductPayService } from "../../printProductPay/Domain/PrintProductPayService";
// import { ProductPay } from "../Domain/ProductPay";
// import { ProductPayReq } from "../Domain/ProductPayReq";
// import { ProductPayService } from "../Domain/ProductPayService";
// import { CreateProductsPay } from "./CreateProductPay";

// export class CreateProductsPayCreateProductsPayCOPY {
//     constructor( 
//         private productPayService: ProductPayService,
//         private printProductPayService: PrintProductPayService,
//         private resourceImageService: ResourceImageService
//     )
//     {}

//     execute(productsPay: ProductPayReq[], payId: string): Promise<ProductPay[]>{
//         const res = productsPay.map( async d =>{
//             d.payId = payId
//             let productPayReq = {
//                 name: d.name,
//                 description:d.description,
//                 price: d.price,
//                 size: d.size,
//                 color: d.color,
//                 typeStamping:d.typeStamping,
//                 quantity: d.quantity,
//                 payId: d.payId,
//             }
//             let p: ProductPay = {} as ProductPay 
//             let pPPay: PrintProductPay = {} as PrintProductPay 
//             let rI: ResourceImage[] = []
            
//             let productPay: ProductPay = await new CreateProductsPay(this.productPayService)
//                 .execute(productPayReq as ProductPay)
//                 .then(productPay=>{
//                     p = productPay
//                     console.log({productPay})
//                     return new CreateResourceImage(this.resourceImageService)
//                         .executeWithResourceImage(d.urlImage, {productPayId: productPay.id})
//                 }).then(resourceImage=>{
//                     rI = resourceImage
//                     console.log({resourceImage})
//                     return new CreatePrintProductPay(this.printProductPayService)
//                         .execute({
//                             name: "string",
//                             author: "string",
//                             productPayId: p.id
//                         } as PrintProductPay)
//                 }).then(printProductPay =>{
//                     pPPay = printProductPay
//                     console.log({printProductPay})
//                     return this.resourceImageService.uploadImages(d.print)
//                 }).then(images=>{
//                     console.log({images})
//                     return new CreateResourceImage(this.resourceImageService)
//                         .execute (images, {printProductPayId: pPPay.id})
//                 }).then(_ =>{
//                     console.log({rI})
//                     return {
//                         ...productPay,
//                         urlImage: rI,
//                         printProductPay: pPPay
//                     }
//                 })
//             return productPay
//             // let productPay = await new CreateProductsPay(this.productPayService)
//             //     .execute(productPayReq as ProductPay)
                
//             // let resorceImage = await new CreateResourceImage(this.resourceImageService)
//             //     .executeWithResourceImage(d.urlImage, {productPayId: productPay.id})
            
//             // let printProductPay = await new CreatePrintProductPay(this.printProductPayService)
//             //     .execute({
//             //         name: "string",
//             //         author: "string",
//             //         productPayId: productPay.id
//             //     } as PrintProductPay)

//             // let images = await this.resourceImageService.uploadImages(d.print)

//             // let url = await new CreateResourceImage(this.resourceImageService)
//             //     .execute (images, {printProductPayId: printProductPay.id})
            
//             // printProductPay.urlImage = url

//             // return {
//             //     ...productPay,
//             //     urlImage: resorceImage,
//             //     printProductPay: printProductPay
//             // }
            
        
//         })
//         return Promise.all(res)
//     }

// }