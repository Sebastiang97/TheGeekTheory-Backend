import { WhatsappService } from "../Domain/WhatsappService";

export class SendMessage {

    constructor(private whatsAppService: WhatsappService) { 
    }

    execute(phone:string, message: string, ): Promise<any> {
        return this.whatsAppService.sendMessage(phone, message)
    }

}