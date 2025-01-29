import { Router } from "express";

import { getRepo } from "../../common/Infrastructure/GetRepo";
import { Payer } from "../Domain/Payer";
import { PayerController } from "./Payer.controller";
import { PayerServiceImpl } from "./PayerServiceImpl";

export class PayerRoutes{ 
    static get routes(): Router {
        const router = Router();
        const payerRepository = getRepo<Payer>("payer")
        const PayerService = new PayerServiceImpl(payerRepository)
        const payerController = new PayerController(PayerService)

        

        router.get("/", payerController.list)

        router.get("/getPayerByIdUser/", payerController.getPayerByIdUser)

        router.get("/:id", payerController.getById)
        
        router.post("/", payerController.create)

        router.put("/:id", payerController.update)

        router.delete("/:id", payerController.delete)

        
        return router
    }
}