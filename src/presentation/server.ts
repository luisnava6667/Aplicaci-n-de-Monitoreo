import { SendEmailLogs } from '../domain/use-cases/email/send-email-logs'
import { FileSystemDatasource } from '../infrastructure/datasource/file-system.datasource'
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository.impl'
import { EmailService } from './email/email.service'

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource()
)
const emailService = new EmailService()
export class Server {
  public static start() {
    console.log('Server started...')
    // console.log(envs.PORT, envs.MAILER_EMAIL, envs.MAILER_SECRET_KEY, envs.PROD)
    //! Mandar Emails
    new SendEmailLogs(emailService, fileSystemLogRepository).execute([
      'navaluisrodolfo@gmail.com',
      'luisnavarro19890603@gmail.com'
    ])
    // const emailService = new EmailService()
    // emailService.sendEmailWithSystemLogs([
    //   'navaluisrodolfo@gmail.com',
    //   'luisnavarro19890603@gmail.com'
    // ])
    // CronService.createJob('*/5 * * * * *', () => {
    //   const url = 'https://google.com'
    //   // const url = 'http://localhost:3000/posts'
    //   new CheckService(
    //     fileSystemLogRepository,
    //     () => console.log(`${url} is a ok`),
    //     (error) => console.log(error)
    //   ).execute(url)
    // new CheckService().execute('http://localhost:3000/posts')
    // })
  }
}

// emailService.sendEmail({
//   to: 'luisnavarro19890603@gmail.com',
//   subject: 'Logs de Sistemas',
//   htmlBody: `
//   <h3>Log de sistemas - NOC</h3>
//   <p>Texto de Prueba</p>
//   <p>Ver logs adjuntos</p>

//   `
// })
