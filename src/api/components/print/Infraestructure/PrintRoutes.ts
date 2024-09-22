import { Router } from "express";
import { ProductController } from "./Print.controller";
import { getRepo } from "../../common/Infrastructure/GetRepo";
import { PrintServiceImpl } from "./PrintServiceImpl";
import { Print } from "../Domain/Print";
import { ResourceImageServiceImpl } from "../../common/Infrastructure/ResourceImageServiceImpl";
import { ResourceImage } from "../../common/Domain/ResourceImage";

export class PrintRoutes{
    static get routes(): Router {
        const router = Router();
        const productImageRepository = getRepo<ResourceImage>("printImage")
        const resourceImageServiceImpl = new ResourceImageServiceImpl(productImageRepository)

        const printRepository = getRepo<Print>("print")
        const printServiceImpl = new PrintServiceImpl(printRepository)
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