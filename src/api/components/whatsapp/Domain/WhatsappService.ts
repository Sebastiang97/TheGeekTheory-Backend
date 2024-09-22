export interface WhatsappService {
    sendMessage(phone: string, message: string): Promise<any>
}