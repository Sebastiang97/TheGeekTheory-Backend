import { Router } from "express";
import { SubCategoryController } from "./SubCategory.controller";
import { getRepo } from "../../common/Infrastructure/GetRepo";
import { ResourceImage } from "../../common/Domain/ResourceImage";
import { ResourceImageServiceImpl } from "../../common/Infrastructure/ResourceImageServiceImpl";
import { SubCategory } from "../Domain/SubCategory";
import { SubCategoryServiceImpl } from "./SubCategoryServiceImpl";
// import { AuthMiddleware } from "../../auth/infraestructure/AuthMiddleware";



// let router = baseRoutes("product").getRoutes()


// export default router;

export class SubCategoryRoutes{
    static get routes(): Router {
        const router = Router();
        const SubCategoryRepository = getRepo<SubCategory>("SubCategory")
        const productImageRepository = getRepo<ResourceImage>("SubCategoryImage")

        const resourceImageServiceImpl = new ResourceImageServiceImpl(productImageRepository)
        const subCategoryServiceImpl = new SubCategoryServiceImpl(SubCategoryRepository)

        const productController = new SubCategoryController(subCategoryServiceImpl, resourceImageServiceImpl)
        

        // router.get("/", AuthMiddleware.hasAdmin, productController.list)

        // router.get("/:id", AuthMiddleware.hasAdmin, productController.getById)
        
        router.get("/", productController.list)

        router.get("/id/:id", productController.getById)

        router.get("/code/:code", productController.getByCode)
        
        router.get("/categoryId/:categoryId", productController.getByCategoryId)
        
        // router.get("/products/:SubCategoryId", productController.getProducts)

        router.post("/", productController.create)

        router.put("/:id", productController.update)

        router.delete("/:id", productController.delete)
        
        return router
    }
}