import { Router } from "express";
import { ProductController } from "./PrintProductPay.controller";
import { getRepo } from "../../common/Infrastructure/GetRepo";
import { ResourceImageServiceImpl } from "../../common/Infrastructure/ResourceImageServiceImpl";
import { ResourceImage } from "../../common/Domain/ResourceImage";
import { PrintProductPay } from "../Domain/PrintProductPay";
import { PrintProductPayServiceImpl } from "./PrintProductPayServiceImpl";

export class PrintRoutes{
    static get routes(): Router {
        const router = Router();
        const productImageRepository = getRepo<ResourceImage>("printImage")
        const resourceImageServiceImpl = new ResourceImageServiceImpl(productImageRepository)

        const printRepository = getRepo<PrintProductPay>("printProductPay")
        const printServiceImpl = new PrintProductPayServiceImpl(printRepository)
        const printController = new ProductController(
            printServiceImpl,
            resourceImageServiceImpl
        )
        
        router.get("/", printController.list)

        router.get("/:id", printController.getById)
        
        router.post("/", printController.create)

        router.put("/:id", printController.update)

        router.delete("/:id", printController.delete)
        
        return router
    }
}