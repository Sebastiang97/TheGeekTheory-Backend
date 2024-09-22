import { Router } from "express";
import { ColorSizeController } from "./ColorSize.controller";
import { ColorSizeServiceImpl } from "./ColorSizeServiceImpl";
import { ColorSize } from "../Domain/ColorSize";
import { getRepo } from "../../common/Infrastructure/GetRepo";


export class ColorSizeRoutes{
    static get routes(): Router {
        const router = Router();
        const colorSizeRepository = getRepo<ColorSize>("product")
        const colorSizeServiceImpl = new ColorSizeServiceImpl(colorSizeRepository)
        const colorSizeController = new ColorSizeController(colorSizeServiceImpl)

        router.get("/", colorSizeController.list)

        router.get("/:id", colorSizeController.getById)

        router.post("/", colorSizeController.create)

        router.put("/:id", colorSizeController.update)

        router.delete("/:id", colorSizeController.delete)
        
        return router
    }
}