import { Request, Response } from "express";
import { IS_CLIENT_READY, QR_CODE_DATA } from "../../../../libs/whatsapp";

export class WhatsAppController {
    constructor() {

    }
    
    getQRCode = (_: Request, res: Response) =>{


        if (QR_CODE_DATA) {
            return res.json({ qr: QR_CODE_DATA, isReady: IS_CLIENT_READY });
        } else {
            return res.status(404).json({ message: 'QR not available' });
        }
    }
        
}