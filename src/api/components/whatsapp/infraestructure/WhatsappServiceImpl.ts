import { Client } from "whatsapp-web.js";
import { WhatsappService } from "../Domain/WhatsappService";


export class WhatsappServiceImpl implements WhatsappService {
    private clientWhatsApp: Client
    
    constructor(client: Client){
        this.clientWhatsApp = client
    }

    async sendMessage(phone: string, message: string){
        console.log({phone})
        return this.clientWhatsApp.sendMessage(`57${phone}@c.us`, message)
    }
 
} 