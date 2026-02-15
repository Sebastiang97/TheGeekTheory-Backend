import { Router } from "express";
import { getRepo } from "../../common/Infrastructure/GetRepo";
import { GeneralProductController } from "./GeneralProduct.controller";
import { GeneralProduct } from "../Domain/GeneralProduct";
import { GeneralProductServiceImpl } from "./GeneralProductServiceImpl";
import { Tag } from "../../tag/Domain/Tag";
import { TagServiceImpl } from "../../tag/Infraestructure/TagServiceImpl";
import { ProductTag } from "../../common/Domain/ProductTag";
import { ProductTagServiceImpl } from "../../common/Infrastructure/ProductTagServiceImpl";
import { ResourceImage } from "../../common/Domain/ResourceImage";
import { ResourceImageServiceImpl } from "../../common/Infrastructure/ResourceImageServiceImpl";
import { ProductServiceImpl } from "../../productIndividual/Infraestructure/ProductServiceImpl";
import { Product } from "../../productIndividual/Domain/Product";
import { ColorGeneralProductServiceImpl } from "../../common/Infrastructure/ColorGeneralProductServiceImpl";
import { ColorGeneralProduct } from "../../common/Domain/ColorGeneralProduct";
import { ColorImage } from "../../common/Domain/ColorImage";
import { ColorImageServiceImpl } from "../../common/Infrastructure/ColorImageServiceImpl";
import { ColorImageSizeServiceImpl } from "../../common/Infrastructure/ColorImageSizeServiceImpl";
import { ColorImageSize } from "../../common/Domain/ColorImageSize";


export class GeneralProductRoutes{
    static get routes(): Router {
        const router = Router();
        const generalProductRepository = getRepo<GeneralProduct>("generalProduct")
        const generalProductServiceImpl = new GeneralProductServiceImpl(generalProductRepository)
        
        const tagRepository = getRepo<Tag>("tag")
        const tagServiceImpl = new TagServiceImpl(tagRepository)

        const productTagRepository = getRepo<ProductTag>("productTag")
        const productTagServiceImpl = new ProductTagServiceImpl(productTagRepository)

        const productRepository = getRepo<Product>("Product")
        const productServiceImpl = new ProductServiceImpl(productRepository)

        const productImageRepository = getRepo<ResourceImage>("ProductImage")

        const resourceImageServiceImpl = new ResourceImageServiceImpl(productImageRepository)

        const colorGeneralProductRepository = getRepo<ColorGeneralProduct>("ColorGeneralProduct")
        const colorGeneralProductServiceImpl = new ColorGeneralProductServiceImpl(colorGeneralProductRepository)

        const colorImageRepository = getRepo<ColorImage>("ColorImage")
        const colorImageServiceImpl = new ColorImageServiceImpl(colorImageRepository)

        const colorImageSizeRepository = getRepo<ColorImageSize>("ColorImageSize")
        const colorImageSizeServiceImpl = new ColorImageSizeServiceImpl(colorImageSizeRepository)

        const generalProductController = new GeneralProductController(
            generalProductServiceImpl,
            productServiceImpl,
            resourceImageServiceImpl,
            tagServiceImpl,
            productTagServiceImpl,
            colorGeneralProductServiceImpl,
            colorImageServiceImpl,
            colorImageSizeServiceImpl
        )
        

        router.get("/", generalProductController.list)

        router.get("/getGPById/:id", generalProductController.getById)

        router.get("/getFilter", generalProductController.getFilter)
        
        router.get("/getGPSubCategoryId/:subCategoryId", generalProductController.getBySubCategoryId)

        router.post("/", generalProductController.create)

        router.put("/:id", generalProductController.update)

        router.delete("/:id", generalProductController.delete)
        
        return router
    }
}