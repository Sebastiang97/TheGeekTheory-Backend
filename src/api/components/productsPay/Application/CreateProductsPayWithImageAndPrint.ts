import { CreateResourceImage } from "../../common/Application/CreateResourceImage";
import { ResourceImage } from "../../common/Domain/ResourceImage";
import { ResourceImageService } from "../../common/Domain/ResourceImageService";
import { CreatePrintProductPay } from "../../printProductPay/Application/CreatePrintProductPay";
import { PrintProductPay } from "../../printProductPay/Domain/PrintProductPay";
import { PrintProductPayService } from "../../printProductPay/Domain/PrintProductPayService";
import { ProductPay } from "../Domain/ProductPay";
import { FileArray } from "express-fileupload";
import { ProductPayService } from "../Domain/ProductPayService";
import { CreateProductsPay } from "./CreateProductPay";
import { ProductPayDTO } from "../Infraestructure/Resource/req/ProductPayDTO";
import { Product } from "../../product/Domain/Product";
import { MapperProductToProductPay } from "./MapperProductToProductPay";

export class CreateProductsPayWithResourceAndPrint {
    constructor( 
        private productPayService: ProductPayService,
        private resourceImageService: ResourceImageService,
        private printProductPayService: PrintProductPayService,
        private resourceImagePrintService: ResourceImageService,
    )
    {}

    execute(products: Product[], payId:string, productsPayReq: ProductPayDTO[], files: FileArray): Promise<ProductPay[]>{
        const res = products.map( async product =>{

            let printProductPay: PrintProductPay = {} as PrintProductPay 
            let resourceImage: ResourceImage[] = []
            const productPayReq = productsPayReq.filter(dto => dto.id === product.id)
            let productPay = new MapperProductToProductPay().execute(product, productPayReq[0], payId)

            let urlImage:any[] = productPay.urlImage?.length 
                ? productPay.urlImage.map(url=>{
                    return {
                        isMain: url.isMain,
                        url:url.url,
                    }
                }) 
                : []
            delete productPay.urlImage 

            
            return new CreateProductsPay(this.productPayService)
                .execute(productPay)
                .then(productPayRes=>{
                    productPay = productPayRes
                    return new CreateResourceImage(this.resourceImageService)
                        .executeWithResourceImage(urlImage, {productPayId: productPay.id})
                }).then(resourceImageRes=>{
                    resourceImage = resourceImageRes
                    const key = "file["+product.id+"]"
                    if(files[key]){
                        return new CreatePrintProductPay(this.printProductPayService)
                            .execute({
                                name: "string",
                                author: "string",
                                productPayId: productPay.id
                            } as PrintProductPay)
                    }
                    return {} as PrintProductPay
                }).then(printProductPayRes =>{
                    if(Object.keys(printProductPay).length){
                        printProductPay = printProductPayRes
                        const key = "file["+product.id+"]"
                        if(files[key]){
                            const fileArray = {
                                file: files[key],
                            };
                            return this.resourceImageService.uploadImages(fileArray)
                        }   
                    }
                    return []
                }).then(images=>{
                    console.log({images})
                    if(images.length){
                        return new CreateResourceImage(this.resourceImagePrintService)
                            .execute (images, {printProductPayId: printProductPay.id})
                    }
                    return []
                }).then(_ =>{
                    return {
                        ...productPay,
                        urlImage: resourceImage,
                        printProductPay: printProductPay
                    }
                }).catch(err=>{
                    console.log(err)
                    return err
                })
        
        })
        return Promise.all(res)
    }

}