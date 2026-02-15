import { ColorGeneralProduct } from "@prisma/client"
import { ColorGeneralProductService } from "../Domain/ColorGeneralProductService"
import { ColorImageService } from "../Domain/ColorImageService"
import { ResourceImageService } from "../Domain/ResourceImageService"
import { DeleteColorImageByColorGPId } from "./DeleteColorImageByColorGPId"
import { DeleteImageByUrls } from "./DeleteImageByUrls"
import { GetColorGPByGPId } from "./GetColorGPByGPId"
import { GetColorImageByColorGPById } from "./GetColorImageByColorGPById"
import { DeleteColorImageSizeByColorImageId } from "./DeleteColorImageSizeByColorImageId"
import { ColorImageSizeService } from "../Domain/ColorImageSizeService"
import { ColorImage } from "../Domain/ColorImage"
import { DeleteColorGeneralProductByGPId } from "./DeleteColorGeneralProductByGPId"

export class DeleteColorGeneralProducts {

    constructor(
        private service: ColorGeneralProductService,
        private ColorImageService: ColorImageService,
        private ColorImageSizeService: ColorImageSizeService,
        private resourceImageService: ResourceImageService
    ){}

    execute(gpId:string): Promise<any>{

        // const deleteIds = ids.map(id=>{
        //     return this.service.delete(id)
        // })
        // return Promise.all(deleteIds)

        let colorImages: ColorImage[] = []
        let colorGeneralProduct: ColorGeneralProduct[] = []
        // return new GetColorGPByGPId(this.service)
        //     .execute(gpId)
        //     .then(colorGP=>{
        //         colorGeneralProduct = colorGP
        //         console.log({colorGeneralProduct, id: colorGeneralProduct[0]?.id })
        //         if(colorGeneralProduct.length){
        //             const result = colorGeneralProduct.map(async cGP=>{
                        
        //                 console.log("GetColorImageByColorGPById")
        //                 colorImages = await new GetColorImageByColorGPById(this.ColorImageService)
        //                     .execute(cGP.id)
        //                 console.log("GetColorImageByColorGPById despues")

        //                 if(colorImages.length){
        //                     let urlImages = colorImages.map(colorImage=>{
        //                         return colorImage.image
        //                     })
        //                     console.log("DeleteImageByUrls")
        //                     await new DeleteImageByUrls(this.resourceImageService)
        //                         .execute(urlImages)
        //                     console.log("DeleteImageByUrls despues")
                            
        //                     console.log("colorImages")
        //                     const res = await colorImages.map(async cI=>{
        //                         console.log("DeleteColorImageSizeByColorImageId")
        //                         return await new DeleteColorImageSizeByColorImageId(this.ColorImageSizeService)
        //                             .execute(cI.id)
        //                     })
        //                     console.log("DeleteColorImageSizeByColorImageId despues")
        //                     console.log("colorImages despues")

        //                     console.log("DeleteColorImageByColorGPId")
        //                     await new DeleteColorImageByColorGPId(this.ColorImageService)
        //                         .execute(cGP.id)
        //                     console.log("DeleteColorImageByColorGPId despues")
                            
        //                     return Promise.all(res)
        //                 }
        //                 return 
        //             })
        //             return Promise.all(result)
        //         }
        //         return 
        //     })
        //     .then(_=>{
        //         console.log({idColorGeneral: gpId})
        //         return new DeleteColorGeneralProductByGPId(this.service)
        //             .execute(gpId)
        //     })
        return new GetColorGPByGPId(this.service)
            .execute(gpId)
            .then(colorGP=>{
                colorGeneralProduct = colorGP
                if(colorGeneralProduct.length){
                    console.log({colorGeneralProduct, id: colorGeneralProduct[0]?.id })
                    const result = colorGeneralProduct.map(cGP=>{
                        return new GetColorImageByColorGPById(this.ColorImageService)
                            .execute(cGP.id)
                            .then(colorImg=>{
                                colorImages = colorImg
                                console.log("{colorImages}")
                                if(colorImages.length){
                                    let urlImages = colorImages.map(colorImage=>{
                                        return colorImage.image
                                    })
                                    return new DeleteImageByUrls(this.resourceImageService)
                                        .execute(urlImages)
                                }
                                return 
                            })
                            
    
                    })
                    return Promise.all(result)
                }
                return
            })
            .then(_=>{
                if(colorGeneralProduct.length){
                    const result = colorGeneralProduct.map(cGP=>{
                        return new GetColorImageByColorGPById(this.ColorImageService)
                            .execute(cGP.id)
                            .then(colorImg=>{
                                colorImages = colorImg
                                const res = colorImages.map(async cI=>{
                                    console.log({cIId: cI.id})
                                    return new DeleteColorImageSizeByColorImageId(this.ColorImageSizeService)
                                        .execute(cI.id)
                                })
                                return Promise.all(res)
                            })

                    })
                    return Promise.all(result)
                }
                return 
            })
            .then(_=>{
                if(colorGeneralProduct.length){
                    const result = colorGeneralProduct.map(cGP=>{
                        console.log({idGP: cGP.id})
                        return new DeleteColorImageByColorGPId(this.ColorImageService)
                            .execute(cGP.id)
                    })
                    return Promise.all(result)
                }
                return 
            })
            .then(_=>{
                console.log({idColorGeneral: gpId})
                return new DeleteColorGeneralProductByGPId(this.service)
                    .execute(gpId)
            })
        // return new GetColorGPByGPId(this.service)
        //     .execute(gpId)
        //     .then(colorGP=>{
        //         colorGeneralProduct = colorGP
        //         console.log({colorGeneralProduct, id: colorGeneralProduct[0].id })
        //         colorGeneralProduct.map(cGP=>{})
        //         return new GetColorImageByColorGPById(this.ColorImageService)
        //             .execute(colorGeneralProduct[0].id)
        //     })
        //     .then(colorImg=>{
        //         colorImages = colorImg
        //         console.log({colorImages})
        //         if(colorImages.length){
        //             let urlImages = colorImages.map(colorImage=>{
        //                 return colorImage.image
        //             })
        //             return new DeleteImageByUrls(this.resourceImageService)
        //                 .execute(urlImages)
        //         }
        //         return 
        //     })
        //     .then(_=>{
        //         console.log({ColorImageId: colorImages[0].id})
        //         return new DeleteColorImageSizeByColorImageId(this.ColorImageSizeService)
        //             .execute(colorImages[0].id)
        //     })
        //     .then(_ =>{
        //         console.log({colorGeneralProductId: colorGeneralProduct[0].id})
        //         return new DeleteColorImageByColorGPId(this.ColorImageService)
        //             .execute(colorGeneralProduct[0].id)
        //     })
        //     .then(_=>{
        //         console.log({idColorGeneral: gpId})
        //         return new DeleteColorGeneralProductByGPId(this.service)
        //             .execute(gpId)
        //     })
    }
}