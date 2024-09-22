import { MailService } from "../Domain/MailService";

export class SendConfirmation {

    constructor(private mailService: MailService) { 
    }

    execute(
        from: string, 
        to: string, 
        subject: string, 
        text:string, 
        html:string
    ): Promise<any> {
        return this.mailService.sendConfirmationMail(
            from,
            to,
            subject,
            text,
            html
        )
    }

}