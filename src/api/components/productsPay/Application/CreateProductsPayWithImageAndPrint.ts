import { CreateResourceImage } from "../../common/Application/CreateResourceImage";
import { ResourceImage } from "../../common/Domain/ResourceImage";
import { ResourceImageService } from "../../common/Domain/ResourceImageService";
// import { CreatePrintProductPay } from "../../printProductPay/Application/CreatePrintProductPay";
import { PrintProductPay } from "../../printProductPay/Domain/PrintProductPay";
import { PrintProductPayService } from "../../printProductPay/Domain/PrintProductPayService";
import { ProductPay } from "../Domain/ProductPay";
import { FileArray, UploadedFile } from "express-fileupload";
import { ProductPayService } from "../Domain/ProductPayService";
import { CreateProductsPay } from "./CreateProductPay";
import { ProductPayDTO } from "../Infraestructure/Resource/req/ProductPayDTO";
import { MapperProductToProductPay } from "./MapperProductToProductPay";
import { PrintProductPayDTO } from "../Infraestructure/Resource/req/PrintProductPayDTO";
import { CreatePrintsProductPay } from "../../printProductPay/Application/CreatePrintsProductPay";
import { Product } from "../../productIndividual/Domain/Product";
import { GeneralProduct } from "../../GeneralProduct/Domain/GeneralProduct";

export class CreateProductsPayWithResourceAndPrint {
    constructor( 
        private productPayService: ProductPayService,
        private resourceImageService: ResourceImageService,
        private printProductPayService: PrintProductPayService,
        // private resourceImagePrintService: ResourceImageService,
    )
    {}

    execute(
        products: Product[], 
        payId:string, 
        productsPayReq: ProductPayDTO[], 
        files: FileArray,
        printProductPayDTO: PrintProductPayDTO[],
        generalProducts: GeneralProduct[]
    ): Promise<ProductPay[]>{
        const res = products.map( async product =>{
            let p: PrintProductPayDTO = printProductPayDTO.filter(p=>p.idProduct == product.id)[0]
            let printProductPayFiltered: any = p?.print ? p.print : []
            let imagesUpload:string[] = []
            
            let resourceImage: ResourceImage[] = []
            const productPayReq = productsPayReq.filter(dto => dto.id === product.id)
            let productPay = new MapperProductToProductPay().execute(product, productPayReq[0], payId, generalProducts)

            let urlImage:any[] = productPay.urlImage?.length 
                ? productPay.urlImage.map(url=>{
                    return {
                        isMain: url.isMain,
                        url:url.url,
                    }
                }) 
                : []
            delete productPay.urlImage 
            productPay.productId = product.id

            return new CreateProductsPay(this.productPayService)
                .execute(productPay)
                .then(productPayRes=>{
                    productPay = productPayRes
                    return new CreateResourceImage(this.resourceImageService)
                        .executeWithResourceImage(urlImage, {productPayId: productPay.id})
                }).then(urlImage =>{
                    console.log({urlImage})
                    resourceImage = urlImage
                    const key = "file["+product.id+"]"
                    if(files[key]){
                        const fileArray = {
                            file: files[key],
                        };
                        return this.resourceImageService.uploadImages(fileArray)
                    }   
                    return []
                }).then(images=>{
                    console.log({images})
                    imagesUpload = images
                    const key = "file["+product.id+"]"
                    if(files[key]){
                        console.log({key})
                        const fileArray = {
                            file: files[key],
                        };
                        let imagesArray: UploadedFile[] = Array.isArray(fileArray?.file) ? fileArray.file : [fileArray?.file]
                        
                        printProductPayFiltered.map((print:any)=>{
                            const index = imagesArray.findIndex((file:any) => file.name.startsWith(print.position)); 
                            print.url = imagesUpload[index]
                        })
                        console.log({printProductPayFiltered})
                        return new CreatePrintsProductPay(this.printProductPayService)
                            .execute(printProductPayFiltered, productPay.id)
                    }
                    return [] as PrintProductPay[]
                }).then(printProductPay =>{
                    console.log({printProductPay})
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