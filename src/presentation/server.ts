import { LogSeverityLevel } from '../domain/entities/log.entity'
import { CheckService } from '../domain/use-cases/checks/check-service'
import { CheckServiceMultiple } from '../domain/use-cases/checks/check-service-multiple'
import { SendEmailLogs } from '../domain/use-cases/email/send-email-logs'
import { FileSystemDatasource } from '../infrastructure/datasource/file-system.datasource'
import { MongoLogDatasource } from '../infrastructure/datasource/mongo-log.datasource'
import { PostgresLogDatasource } from '../infrastructure/datasource/postgres-log.datasource'
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository.impl'
import { CronService } from './cron/cron-service'
import { EmailService } from './email/email.service'

const fslogRepository = new LogRepositoryImpl(new FileSystemDatasource())
const mongologRepository = new LogRepositoryImpl(new MongoLogDatasource())
const postgresslogRepository = new LogRepositoryImpl(
  new PostgresLogDatasource()
)

const emailService = new EmailService()
export class Server {
  public static async start() {
    console.log('Server started...')
    // console.log(envs.PORT, envs.MAILER_EMAIL, envs.MAILER_SECRET_KEY, envs.PROD)
    //! Mandar Emails
    // new SendEmailLogs(emailService, fileSystemLogRepository).execute([
    //   'navaluisrodolfo@gmail.com',
    //   'luisnavarro19890603@gmail.com'
    // ])

    // const logs = await logRepository.getLogs(LogSeverityLevel.low)
    // console.log(logs)

    // const emailService = new EmailService()
    // emailService.sendEmailWithSystemLogs([
    //   'navaluisrodolfo@gmail.com',
    //   'luisnavarro19890603@gmail.com'
    // ])
    // CronService.createJob('*/5 * * * * *', () => {
    //   const url = 'https://google.com'
    //   // const url = 'http://localhost:3000/posts'
    //   new CheckServiceMultiple(
    //     [fslogRepository, mongologRepository, postgresslogRepository],
    //     () => console.log(`${url} is a ok`),
    //     (error) => console.log(error)
    //   ).execute(url)
    // })
  }
}

// new CheckService().execute('http://localhost:3000/posts')
// emailService.sendEmail({
//   to: 'luisnavarro19890603@gmail.com',
//   subject: 'Logs de Sistemas',
//   htmlBody: `
//   <h3>Log de sistemas - NOC</h3>
//   <p>Texto de Prueba</p>
//   <p>Ver logs adjuntos</p>

//   `
// })
