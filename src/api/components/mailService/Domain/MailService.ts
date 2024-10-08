export interface MailService {
    sendConfirmationMail(
        from: string, 
        to: string, 
        subject: string, 
        text:string, 
        html:string
    ): Promise<any>
}