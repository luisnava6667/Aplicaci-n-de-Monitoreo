import nodemailer from 'nodemailer'
import { envs } from '../../config/plugins/envs.plugins'
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity'
export interface SendMailOptions {
  to: string | string[]
  subject: string
  htmlBody: string
  attachements?: Attachement[]
}
export interface Attachement {
  filename: string
  path: string
}
export class EmailService {
  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY
    }
  })
  constructor() {}
  async sendEmail(options: SendMailOptions): Promise<boolean> {
    const { to, subject, htmlBody, attachements = [] } = options

    try {
      const sentInformation = await this.transporter.sendMail({
        to: to,
        subject: subject,
        html: htmlBody,
        attachments: attachements
      })
      console.log(sentInformation)
      const log = new LogEntity({
        level: LogSeverityLevel.low,
        message: 'Email sent',
        origin: 'email.service.ts'
      })
      // this.logRepository.saveLog(log)
      return true
    } catch (error) {
      const log = new LogEntity({
        level: LogSeverityLevel.high,
        message: 'Email not sent',
        origin: 'email.service.ts'
      })
      // this.logRepository.saveLog(log)
      console.log(error)

      console.log(1)
      return false
    }
  }
  async sendEmailWithSystemLogs(to: string | string[]) {
    const subject = 'Log del servidor'
    const htmlBody = `
       <h3>Log de sistemas - NOC</h3>
       <p>Texto de Prueba</p>
       <p>Ver logs adjuntos</p>
   `
    const attachements: Attachement[] = [
      { filename: 'logs-all.log', path: './logs/logs-all.log' },
      { filename: 'logs-medium.log', path: './logs/logs-medium.log' },
      { filename: 'logs-high.log', path: './logs/logs-high.log' }
    ]
    return this.sendEmail({
      to,
      subject,
      attachements,
      htmlBody
    })
  }
}
