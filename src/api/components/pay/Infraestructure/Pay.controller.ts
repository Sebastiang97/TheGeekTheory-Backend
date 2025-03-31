import { Request, Response } from "express";
import { PayService } from "../Domain/PayService";
import { PayerService } from "../../payer/Domain/PayerService";
import { ProductService } from "../../product/Domain/ProductService";
import { GetProductsById } from "../../product/Application/GetProductsById";
import { ValidateProducts } from "../Application/ValidateProducts";
import { MapperProductPayToItemsMP } from "../../productsPay/Application/MapperProductPayToItemsMP";
import { PaymentService } from "../../../../libs/mercadopago";
import { CreatePay } from "../Application/CreatePay";
import { ProductPayService } from "../../productsPay/Domain/ProductPayService";
import { Pay } from "../Domain/Pay";
// import { CreateProductsPay } from "../../productsPay/Application/CreateProductPay";
// import { CreateResourceImage } from "../../common/Application/CreateResourceImage";
import { ResourceImageService } from "../../common/Domain/ResourceImageService";
import { GetPayerById } from "../../payer/Application/GetPayerById";
import { Payer } from "../../payer/Domain/Payer";
import { UpdatePay } from "../Application/UpdatePay";
import { GetPayById } from "../Application/GetPayById";
import { PaymentResponse } from "mercadopago/dist/clients/payment/commonTypes";
import { ToPay } from "../Application/ToPay";
import { WhatsappService } from "../../whatsapp/Domain/WhatsappService";
import { MailService } from "../../mailService/Domain/MailService";
import { GetPayByPayerId } from "../Application/GetPayByPayerId";
import { GetPays } from "../Application/GetPays";
import { GetTableTotalPay } from "../Application/GetTableTotalPay";
import { CreateProductsPayWithResourceAndPrint } from "../../productsPay/Application/CreateProductsPayWithImageAndPrint";
import { PrintProductPayService } from "../../printProductPay/Domain/PrintProductPayService";
import { Product } from "../../product/Domain/Product";
import { PARSE_INT } from "../../../../utils/parseInt";
import { GET_NEXT_PREVIOUS_CURSOR, GET_PAGINATION_QUERY } from "../../../../utils/GetPaginationQuery";
import { SendConfirmation } from "../../mailService/Application/SendMail";
import { HTML } from "../../user/Infraestructure/templateHTML";
import { SendMessage } from "../../whatsapp/Application/SendMessage";
import { productNumberGuideDTOSchema } from "./SchemaValidation/productNumberGuideDTOSchema";
import { GetProductPayByPayId } from "../../productsPay/Application/GetProductPayByPayId";
import { SubtractProductByQuantity } from "../../product/Application/SubtractProductByQuantity";
import { ProductPay } from "../../productsPay/Domain/ProductPay";
import { UpdateProducts } from "../../product/Application/UpdateProducts";

export class PayController {
    constructor(
        private service: PayService,
        private paymentService: PaymentService,
        private payerService: PayerService,
        private productService: ProductService,
        private productPayService: ProductPayService,
        private resourceImageService: ResourceImageService,
        private printProductPayService: PrintProductPayService,
        // private resourceImagePrintService: ResourceImageService,
        private whatsappService: WhatsappService,
        private mailService: MailService,
    ) {
        this.resourceImageService
        this.whatsappService
        this.mailService
        
    }

    list = (_: Request, res: Response,) => {
        return new GetPays(this.service)
            .execute()
            .then(pay =>{
                return res.status(200).json(pay)
            }).catch(err => {
                return res.status(400).json(err)
            })
    }

    getPayAndPayer = (req: Request, res: Response,) => {
        const cursor = req.query.cursor as string
        const direction = req.query.direction as string
        const limit = PARSE_INT(req.query.limit) as number
        
        const query = GET_PAGINATION_QUERY({limit, cursor, direction})

        return new GetTableTotalPay(this.service)
            .execute(query)
            .then(pays =>{
                return res.status(200).json(GET_NEXT_PREVIOUS_CURSOR(pays))
            }).catch(err => {
                console.log(err)
                return res.status(400).json(err)
            })
    }

    getPayById = (req: Request, res: Response)=>{
        const {payId} = req.params
        return new GetPayById(this.service)
            .execute(payId)
            .then(pay =>{
                return res.status(200).json(pay)
            }).catch(err => {
                return res.status(400).json(err)
            })
    }

    getByPayerId = (req: Request, res: Response) => {
        const {payerId} = req.params
        const cursor = req.query.cursor as string
        const direction = req.query.direction as string
        const limit = PARSE_INT(req.query.limit) as number
        
        const query = GET_PAGINATION_QUERY({limit, cursor, direction})
        return new GetPayByPayerId(this.service)
            .execute(payerId, query)
            .then(pays =>{
                return res.status(200).json(GET_NEXT_PREVIOUS_CURSOR(pays))
            }).catch(err => {
                console.log(err)
                return res.status(400).json(err)
            })
    }

    create = (req: Request, res: Response,) => {
        // const { items, payerId } = req.body
        
        if(!req.body){
            return res.status(400).json("no se ha enviado productos")
        }
        const { elements, payerId, prints } = req.body
        const listElements = JSON.parse(elements)
        const printsProductPay = JSON.parse(prints)
        let files = req.files
        const ids = listElements.map((el:any) => el.id)

        if (!files || Object.keys(files).length === 0) {
            files = {}
            // return res.status(400).json({error: 'No se ha encontrado ningún archivo.'})
        }
        console.log({elements, files, printsProductPay})
        
        let payerReq: Payer
        let products: Product[]
        let pay: Pay 
        return new GetPayerById(this.payerService)
            .execute(payerId)
            .then(payer=>{
                if(payer === null){
                    throw new Error("El payer no existe")
                }
                payerReq = payer ? payer : {} as Payer
                return new GetProductsById(this.productService)
                    .execute(ids)
            })
            .then(products => {
                return new ValidateProducts()
                    .execute(products, ids)
            })
            .then(productValidate=>{
                products = productValidate
                return new ToPay()
                    .execute(products, payerReq.id)
            })
            .then(pay=>{
                return new CreatePay(this.service)
                    .execute(pay)
            })
            .then(newPay=>{
                pay = newPay
                return new CreateProductsPayWithResourceAndPrint(
                        this.productPayService,
                        this.resourceImageService,
                        this.printProductPayService,
                        // this.resourceImagePrintService
                    ).execute(products, pay.id, listElements, files, printsProductPay)
            })
            .then(productsPay => {
                console.log({productsPay})
                return new MapperProductPayToItemsMP()
                    .execute(productsPay)
            })
            .then(items => {
                return this.paymentService
                    .createPrefence(items, pay, payerReq)
            })
            .then(result => {
                return res.json(result.init_point)
            })
            // .then(items=>{
            //     console.log({items})
            //     return res.json(items)
            // })
            .catch(err => {
                console.log({err})
                return res.status(400).json(err)
            })
    }


    test = async (_: Request, res: Response) => {
        res.sendStatus(200)

        await new Promise((resolve, _) => {
            console.log("Hola despues de status 200 ")
            resolve("")
        })
    }
    
    receiveWebhook = async (req: Request, res: Response) => {
        // res.sendStatus(200)

        try {
            const query = req?.query
            if (query?.type === "payment") {
                let paymentMP: PaymentResponse
                let payerReq: Payer
                let payId: string = ""
                let productsPay: ProductPay[] = []
                return this.paymentService
                    .getPayment(query['data.id'] as string)
                    .then(payment =>{
                        paymentMP = payment
                        console.log(JSON.stringify(payment))
                        return new GetPayById(this.service)
                            .execute(payment.additional_info?.payer?.phone?.number || "")
                    })
                    .then(pay => {
                        if(pay){
                            payId = pay.id
                            pay.state = paymentMP.status || "NOT_RESPONSE"
                            pay.paymentId = paymentMP?.id?.toString() || ""
                            console.log({pay})
                            return new UpdatePay(this.service)
                                .execute(pay)
                        }
                        throw new Error("No se encontro el pago")
                    })
                    .then(pay=>{
                        return new GetPayerById(this.payerService)
                            .execute(pay.payerId)
                    })
                    .then(payer =>{
                        if(payer){
                            payerReq = payer
                            let from = 'The Geek Theory <ssebastiang97@gmail.com>'
                            let subject = "Hello ✔"
                            let text = "Hello world?"
                            return new SendConfirmation(this.mailService)
                                .execute(
                                    from,
                                    payer.email, 
                                    subject, 
                                    text, 
                                    HTML
                                )
                        }
                        throw new Error("No se encontro el payer")
                    })
                    .then(_ =>{
                        console.log("whatsapp")
                        return  new SendMessage(this.whatsappService)
                            .execute(
                                payerReq.phone.toString(), 
                                "tu compra se ha completado 😊💖"
                            )
                        
                    })
                    .then(_ =>{
                        return new GetProductPayByPayId(this.productPayService)
                            .execute(payId, false)
                        
                    })
                    .then(productsPayReq=>{
                        productsPay= productsPayReq
                        let ids:string[] = []
                        productsPay.forEach((item) => {
                            ids.push(item.id)
                        })
                        return new GetProductsById(this.productService)
                            .execute(ids, false)
                    })
                    .then(products=>{
                        return new SubtractProductByQuantity()
                            .execute(products, productsPay)
                    })
                    .then(productsUpdated=>{
                        return new UpdateProducts(this.productService)
                            .execute(productsUpdated)
                    })
                    .then(_=>{
                        console.log("whatsapp enviado")
                        return res.sendStatus(200)
                    })
                    .catch(err => {
                        console.log(err)
                        return res.sendStatus(400)
                    })
            }else{
                return res.sendStatus(200)
            }

        } catch (error) {
            console.log({ error })
            return res.sendStatus(400)
        }
    }

    success = (_: Request, __: Response,) => {

        return

    }

    pending = (_: Request, __: Response,) => {
        return

    }

    failure = (_: Request, __: Response,) => {
        return

    }


    update = (_: Request, __: Response,) => {
        return

    }

    updateNumberGuide = (req: Request, res: Response,) => {
        const {payId} = req.params
        const payDTOReq = req.body

        const result = productNumberGuideDTOSchema.safeParse(payDTOReq)
        if(!result.success){
            return res.status(400).json({error:result.error.issues})
        }

        
        return new GetPayById(this.service)
            .execute(payId)
            .then(pay =>{
                return pay
            })
            .then(pay =>{
                console.log(pay)
                if(pay){
                    pay.numberGuide = payDTOReq.numberGuide
                    return new UpdatePay(this.service)
                        .execute(pay)
                }
                throw new Error("No se encontro el pago")
            }).then(pay=>{
                return new GetPayerById(this.payerService)
                    .execute(pay.payerId)
            })
            .then(payer =>{
                if(payer){
                    return  new SendMessage(this.whatsappService)
                        .execute(
                            payer.phone.toString(), 
                            "su numero de guia es " + payDTOReq.numberGuide
                        )
                }
                throw new Error("No se encontro el payer")
            }).then(pay =>{
                return res.status(200).json(pay)
            })
            .catch(err => {
                return res.status(400).json(err)
            })

    }

    delete = (_: Request, __: Response,) => {
        return
    }
}
