import { IMailProvider, IMessage } from "../IMailProvaider";
import nodemailer from 'nodemailer'
import Mail from 'nodemailer/lib/mailer'
export class MailTrapProvider implements IMailProvider {
 private transporter: Mail
 constructor(){
     this.transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "bdc794cdcb6a87",
          pass: "c8e72bf5e2e527"
        }
     })
 }
    async send(message:IMessage) {
        await this.transporter.sendMail({
            to: message.to,
            from:message.from,
            subject:message.subject,
            html:message.body
        })
    }
}
