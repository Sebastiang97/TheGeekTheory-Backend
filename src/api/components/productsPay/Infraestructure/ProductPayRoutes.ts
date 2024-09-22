import { Router } from "express";

import { getRepo } from "../../common/Infrastructure/GetRepo";
import { ProductPayServiceImpl } from "./ProductPayServiceImpl";
import { ProductPay } from "../Domain/ProductPay";
import { ProductPayController } from "./ProductPay.controller";

export class ProductPayRoutes{ 
    static get routes(): Router {
        const router = Router();
        const productPayRepository = getRepo<ProductPay>("productPay")
        const productPayServiceImpl = new ProductPayServiceImpl(productPayRepository)

        
        const paymentController = new ProductPayController(productPayServiceImpl)
        

        router.get("/", paymentController.list)

        router.get("/:id", paymentController.getById)

        router.get("/getByPayId/:payId", paymentController.getByPayId)
        
        router.post("/", paymentController.create)

        router.put("/:id", paymentController.update)

        router.delete("/:id", paymentController.delete)

        
        return router
    }
}