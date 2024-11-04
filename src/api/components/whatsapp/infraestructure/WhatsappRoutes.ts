import { Router } from "express";
import { WhatsAppController } from "./WhatsappController";



export class WhatsAppRoutes {
    static get routes(): Router {
        const router = Router();
        const whatsappController = new WhatsAppController()

        router.get("/qrcode", whatsappController.getQRCode)

        return router
    }
}