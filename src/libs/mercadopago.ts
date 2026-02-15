import { MercadoPagoConfig, Payment, Preference } from "mercadopago"
import { Items } from "mercadopago/dist/clients/commonTypes"
import { Payer } from "../api/components/payer/Domain/Payer"
import { Pay } from "../api/components/pay/Domain/Pay"

const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN_DEV || "" })

export class PaymentService {

  createPrefence(items: Items[], pay: Pay, payer: Payer) {
    let preference = new Preference(client)
    return preference.create({
      body: {
        items: items,
        notification_url: process.env.URL_DEV_TUNNEL + "/api/pay/receiveWebhook",
        back_urls: {
          success: process.env.URL_FRONT +"/pay/mercadopago?payId="+pay.id,
          pending: process.env.URL_FRONT + "/api/payment/pending",
          failure: process.env.URL_FRONT + "/api/payment/failure",
        },
        auto_return: "approved",
        payer: {
          name: payer.name,
          surname: payer.surname,
          email: payer.email,
          phone: {
            area_code: '57',
            number: pay.id.toString(),
          },
          identification: {
            type: 'id',
            number: payer.id,
          },
          address: {
            zip_code: payer.zipCode,
            street_name: payer.address + " " + payer.detailAddress,
            street_number: "123",
          },
        },
      },
    })
    // return new Preference(client).create({
    //   body: {
    //     items: items,
    //     notification_url: process.env.URL_DEV_TUNNEL + "/api/pay/receiveWebhook",
    //     back_urls: {
    //       success: process.env.URL_FRONT +"/pay/mercadopago?payId="+pay.id,
    //       pending: process.env.URL_FRONT + "/api/payment/pending",
    //       failure: process.env.URL_FRONT + "/api/payment/failure",
    //     },
    //     auto_return: "approved",
    //     payer: {
    //       name: payer.name,
    //       surname: payer.surname,
    //       email: payer.email,
    //       phone: {
    //         area_code: '57',
    //         number: pay.id.toString(),
    //       },
    //       identification: {
    //         type: 'id',
    //         number: payer.id,
    //       },
    //       address: {
    //         zip_code: payer.zipCode,
    //         street_name: payer.address + " " + payer.detailAddress,
    //         street_number: "123",
    //       },
    //     },
    //   },
    // })
  }

  getPayment(id: string) {
    return new Payment(client).get({
      id: id,
    })
  }

}