import { GeneralProduct } from "../Domain/GeneralProduct";
import { GeneralProductService } from "../Domain/GeneralProductService";
// import { GeneralProductDTO } from "../Infraestructure/DTO/GeneralProductDTO";

export class GetGeneralProductsBySubcategoryId {
    constructor(
        private generalProductService: GeneralProductService,
    ) { }

    // async execute(subCategoryId:string): Promise<GeneralProduct[]>{
    //     return this.generalProductService.findAll({
    //         where: {
    //             subCategoryId: subCategoryId,
    //         },
    //       })
    // }
    async execute(subCategoryId: string): Promise<GeneralProduct[]> {
        return this.generalProductService.findAll({
            where: {
                subCategoryId: subCategoryId,
                isVisible: true
            },
            select: {
                // Seleccionar campos específicos de GeneralProduct
                id: true,
                title: true,
                description: true,
                price: true,
                quantity: true,
                creationDate: true,
                updatedAt: true,
                subCategoryId: true,
                categoryId: true,
                isVisible: true,
                // Relaciones
                
                tags: {
                    select: {
                        tag: true                      
                    }
                },
                // ColorGeneralProduct con toda su jerarquía
                colorImageSize: {
                    select: {
                        // id: true,
                        colorsImages: {
                            select: {
                                id: true,
                                color: true,
                                image: true,
                                size: {
                                    select: {
                                        id: true,
                                        size: true
                                    }
                                }
                            }
                        }
                    }
                }
            },
            orderBy: {
                price: 'asc' // o cualquier otro campo que quieras ordenar
            }
        })
    }
}
