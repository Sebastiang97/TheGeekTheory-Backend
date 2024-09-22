import { Router } from "express";
import { CategoryController } from "./Category.controller";
import { getRepo } from "../../common/Infrastructure/GetRepo";
import { CategoryServiceImpl } from "./CategoryServiceImpl";
import { Category } from "../Domain/Category";

// import { AuthMiddleware } from "../../auth/infraestructure/AuthMiddleware";

export class CategoryRoutes{
    static get routes(): Router {
        const router = Router();
        const categoryRepository = getRepo<Category>("category")
        const categoryServiceImpl = new CategoryServiceImpl(categoryRepository)

        const productController = new CategoryController(categoryServiceImpl)
        

        // router.get("/", AuthMiddleware.hasAdmin, productController.list)

        // router.get("/:id", AuthMiddleware.hasAdmin, productController.getById)
        
        router.get("/", productController.list)

        router.get("/:id", productController.getById)
        
        router.post("/", productController.create)

        router.put("/:id", productController.update)

        router.delete("/:id", productController.delete)
        
        return router
    }
}