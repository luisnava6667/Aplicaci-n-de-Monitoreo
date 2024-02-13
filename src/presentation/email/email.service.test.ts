import nodemailer from 'nodemailer'
import { EmailService, SendMailOptions } from './email.service'
import { envs } from '../../config/plugins/envs.plugins'

describe('email.service.ts EmailService', () => {
  const mockSendMail = jest.fn()
  //Mock al createTransport
  //   nodemailer.createTransport = jest.fn().mockRejectedValue({
  //     sendMail: mockSendMail
  //   })
  const emailService = new EmailService()
  test('should send email', async () => {
    const options: SendMailOptions = {
      to: 'luisnavarro19890603@gmail.com',
      subject: 'Test',
      htmlBody: '<h1>Test</h1>'
    }
    const emailSent = await emailService.sendEmail(options)
    expect(emailSent).toBeTruthy()
  })
  test('Should return error', async () => {
    envs.MAILER_EMAIL = 'sarasa@sarasa.com'
    const options: SendMailOptions = {
      to: 'fede@google.com',
      subject: 'Test',
      htmlBody: '<h1>Test</h1>'
    }

    try {
      const emailSent = await emailService.sendEmail(options)
      expect(emailSent).toBeFalsy()
    } catch (error) {
      // console.log(error);
    }
  })
})
