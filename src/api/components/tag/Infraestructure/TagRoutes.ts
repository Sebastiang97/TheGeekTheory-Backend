import { Router } from "express";
import { getRepo } from "../../common/Infrastructure/GetRepo";
import { TagServiceImpl } from "./TagServiceImpl";
import { Tag } from "../Domain/Tag";
import { TagController } from "./Tag.controller";

// import { AuthMiddleware } from "../../auth/infraestructure/AuthMiddleware";

export class TagRoutes{
    static get routes(): Router {
        const router = Router();
        const tagRepository = getRepo<Tag>("tag")
        const tagServiceImpl = new TagServiceImpl(tagRepository)


        
        const productController = new TagController(
            tagServiceImpl
        )
        

        // router.get("/", AuthMiddleware.hasAdmin, productController.list)

        // router.get("/:id", AuthMiddleware.hasAdmin, productController.getById)
        
        router.get("/", productController.list)
        
        router.get("/GetTagsByCursor", productController.listByCursor)

        router.get("/:id", productController.getById)
        
        router.get("/getByName/:name", productController.getByName)
        
        router.post("/", productController.create)

        router.put("/:id", productController.update)

        router.delete("/:id", productController.delete)
        
        return router
    }
}