import { GeneralProduct } from "../Domain/GeneralProduct";
import { GeneralProductService } from "../Domain/GeneralProductService";
// import { GeneralProductDTO } from "../Infraestructure/DTO/GeneralProductDTO";

export class GetGeneralProductsByFilters {
    constructor(
        private generalProductService: GeneralProductService,
    ) { }

    async execute(query: any): Promise<GeneralProduct[]> {
       
        return this.generalProductService.findAll({
            ...query,
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
                tags: {
                    select: {
                        tag: true                      
                    }
                },
                // ColorGeneralProduct con toda su jerarquía
                colorImageSize: {
                    select: {
                        id: true,
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
            }
        })
    }
}




