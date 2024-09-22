import { Router } from "express";
import { PayController } from "./Pay.controller";
import { getRepo } from "../../common/Infrastructure/GetRepo";
import { PayerServiceImpl } from "../../payer/Infraestructure/PayerServiceImpl";
import { PayServiceImpl } from "./PayServiceImpl";
import { Pay } from "../Domain/pay";

import { PaymentService } from "../../../../libs/mercadopago";
import { ProductPay } from "../../productsPay/Domain/ProductPay";
import { ProductPayServiceImpl } from "../../productsPay/Infraestructure/ProductPayServiceImpl";
import { ProductServiceImpl } from "../../product/Infraestructure/ProductServiceImpl";
import { Product } from "../../product/Domain/Product";
import { ResourceImage } from "../../common/Domain/ResourceImage";
import { ResourceImageServiceImpl } from "../../common/Infrastructure/ResourceImageServiceImpl";
import { WhatsappServiceImpl } from "../../whatsapp/infraestructure/WhatsappServiceImpl";
import { client } from "../../../../libs/whatsapp";
import { MailServiceImpl } from "../../mailService/infraestructure/MailServiceImpl";
import { transporter } from "../../../../store/email/mailer";
import { Payer } from "../../payer/Domain/Payer";
import { PrintProductPay } from "../../printProductPay/Domain/PrintProductPay";
import { PrintProductPayServiceImpl } from "../../printProductPay/Infraestructure/PrintProductPayServiceImpl";

export class PayRoutes{ 
    static get routes(): Router {
        const router = Router();

        const payerRepository = getRepo<Payer>("payer")
        const payerServiceImpl = new PayerServiceImpl(payerRepository)


        const payRepository = getRepo<Pay>("pay")
        const payServiceImpl = new PayServiceImpl(payRepository)

        const paymentServiceImpl = new PaymentService()

        const productRepository = getRepo<Product>("product")
        const productServiceImpl = new ProductServiceImpl(productRepository)

        const productPayRepository = getRepo<ProductPay>("productPay")
        const productPayServiceImpl = new ProductPayServiceImpl(productPayRepository)

        const productPayImageRepository = getRepo<ResourceImage>("productPayImage")
        const resourceImageServiceImpl = new ResourceImageServiceImpl(productPayImageRepository)

        const printProductPayImageRepository = getRepo<ResourceImage>("printProductPayImage")
        const resourceImagePrintServiceImpl = new ResourceImageServiceImpl(printProductPayImageRepository)

        const printProductPayRepository = getRepo<PrintProductPay>("printProductPay")
        const printProductPayServiceImpl = new PrintProductPayServiceImpl(printProductPayRepository)

        const whatsappServiceImpl = new WhatsappServiceImpl(client)

        const mailServiceImpl = new MailServiceImpl(transporter)
        
        const paymentController = new PayController(
            payServiceImpl, 
            paymentServiceImpl, 
            payerServiceImpl, 
            productServiceImpl,
            productPayServiceImpl,
            resourceImageServiceImpl,
            printProductPayServiceImpl,
            resourceImagePrintServiceImpl,
            whatsappServiceImpl,
            mailServiceImpl
        )
        
        router.get("/", paymentController.list)
        
        router.get("/getPaysAndPayer", paymentController.getPayAndPayer)

        router.get("/:payId", paymentController.getPayById)

        router.get("/getByPayerId/:payId", paymentController.getByPayerId)

        router.post("/", paymentController.create)

        router.post("/test", paymentController.test)

        router.post("/receiveWebhook", paymentController.receiveWebhook)

        router.post("/success", paymentController.success)

        router.post("/pending", paymentController.pending)

        router.post("/failure", paymentController.failure)

        router.put("/:id", paymentController.update)

        router.delete("/:id", paymentController.delete)

        
        return router
    }
}