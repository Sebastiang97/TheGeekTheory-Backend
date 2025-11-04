import { Router } from "express";
import { getRepo } from "../../common/Infrastructure/GetRepo";
import { GeneralProductController } from "./GeneralProduct.controller";
import { GeneralProduct } from "../Domain/GeneralProduct";
import { GeneralProductServiceImpl } from "./GeneralProductServiceImpl";
import { Tag } from "../../tag/Domain/Tag";
import { TagServiceImpl } from "../../tag/Infraestructure/TagServiceImpl";
import { ProductTag } from "../../common/Domain/ProductTag";
import { ProductTagServiceImpl } from "../../common/Infrastructure/ProductTagServiceImpl";


export class GeneralProductRoutes{
    static get routes(): Router {
        const router = Router();
        const generalProductRepository = getRepo<GeneralProduct>("generalProduct")
        
        const tagRepository = getRepo<Tag>("tag")
        const tagServiceImpl = new TagServiceImpl(tagRepository)

        const productTagRepository = getRepo<ProductTag>("productTag")
        const productTagServiceImpl = new ProductTagServiceImpl(productTagRepository)

        const generalProductServiceImpl = new GeneralProductServiceImpl(generalProductRepository)
        const generalProductController = new GeneralProductController(
            generalProductServiceImpl,
            tagServiceImpl,
            productTagServiceImpl
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