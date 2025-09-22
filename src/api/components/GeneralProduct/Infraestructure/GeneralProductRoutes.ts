import { Router } from "express";
import { getRepo } from "../../common/Infrastructure/GetRepo";
import { GeneralProductController } from "./GeneralProduct.controller";
import { GeneralProduct } from "../Domain/GeneralProduct";
import { GeneralProductServiceImpl } from "./GeneralProductServiceImpl";
// import { ResourceImageServiceImpl } from "../../common/Infrastructure/ResourceImageServiceImpl";
// import { ResourceImage } from "../../common/Domain/ResourceImage";

export class GeneralProductRoutes{
    static get routes(): Router {
        const router = Router();
        const generalProductRepository = getRepo<GeneralProduct>("generalProduct")
        // const productImageRepository = getRepo<ResourceImage>("productImage")
        // const productImageServiceImpl = new ResourceImageServiceImpl(productImageRepository)
        const generalProductServiceImpl = new GeneralProductServiceImpl(generalProductRepository)
        const generalProductController = new GeneralProductController(
            generalProductServiceImpl
        )
        

        router.get("/", generalProductController.list)

        router.get("/:id", generalProductController.getById)
        
        router.get("/subcategoryid/:subCategoryId", generalProductController.getBySubCategoryId)

        router.post("/", generalProductController.create)

        router.put("/:id", generalProductController.update)

        router.delete("/:id", generalProductController.delete)
        
        return router
    }
}