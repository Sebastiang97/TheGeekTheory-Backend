import { Router } from "express";
import { CategoryController } from "./Category.controller";
import { getRepo } from "../../common/Infrastructure/GetRepo";
import { CategoryServiceImpl } from "./CategoryServiceImpl";
import { Category } from "../Domain/Category";
import { SubCategory } from "@prisma/client";
import { SubCategoryServiceImpl } from "../../subcategory/Infraestructure/SubCategoryServiceImpl";
import { ResourceImage } from "../../common/Domain/ResourceImage";
import { ResourceImageServiceImpl } from "../../common/Infrastructure/ResourceImageServiceImpl";
import { Product } from "../../product/Domain/Product";
import { ProductServiceImpl } from "../../product/Infraestructure/ProductServiceImpl";

// import { AuthMiddleware } from "../../auth/infraestructure/AuthMiddleware";

export class CategoryRoutes{
    static get routes(): Router {
        const router = Router();
        const categoryRepository = getRepo<Category>("category")
        const categoryServiceImpl = new CategoryServiceImpl(categoryRepository)

        const subCategoryRepository = getRepo<SubCategory>("SubCategory")
        const subCategoryServiceImpl = new SubCategoryServiceImpl(subCategoryRepository)

        const productRepository = getRepo<Product>("Product")
        const productServiceImpl = new ProductServiceImpl(productRepository)

        const subImageRepository = getRepo<ResourceImage>("SubCategoryImage")
        const productImageRepository = getRepo<ResourceImage>("ProductImage")

        const subResourceImageServiceImpl = new ResourceImageServiceImpl(subImageRepository)
        const productResourceImageServiceImpl = new ResourceImageServiceImpl(productImageRepository)
        
        
        const productController = new CategoryController(
            categoryServiceImpl,
            subCategoryServiceImpl,
            subResourceImageServiceImpl,
            productServiceImpl,
            productResourceImageServiceImpl
        )
        

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