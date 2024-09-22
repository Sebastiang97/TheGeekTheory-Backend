import { Transporter } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { MailService } from "../Domain/MailService";


export class MailServiceImpl implements MailService {
    private transporterMail: Transporter<SMTPTransport.SentMessageInfo>
    
    constructor(transporter: Transporter<SMTPTransport.SentMessageInfo>){
        this.transporterMail = transporter
    }

    async sendConfirmationMail(from: string, to: string, subject: string, text:string, html:string){
        return this.transporterMail.sendMail({
            from,
            to,
            subject,
            text,
            html,
          });
    }
 
} 