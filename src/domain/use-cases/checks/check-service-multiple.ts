import { LogEntity, LogSeverityLevel } from '../../entities/log.entity'
import { LogRepository } from '../../repository/log.repository'

export interface CheckServiceMutipleUseCase {
  execute(url: string): Promise<boolean>
}

type SuccessCalback = (() => void) | undefined
type ErrorCalback = ((error: string) => void) | undefined

export class CheckServiceMultiple implements CheckServiceMutipleUseCase {
  constructor(
    private readonly logRepository: LogRepository[],
    private readonly successCallback: SuccessCalback,
    private readonly errorCallback: ErrorCalback
  ) {}
  private callLogs(log: LogEntity) {
    this.logRepository.forEach((logRepository) => {
      logRepository.saveLog(log)
    })
  }
  async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url)
      if (!req.ok) {
        throw new Error(`Error on check service: ${url}`)
      }
      const log = new LogEntity({
        message: `Service ${url} working`,
        level: LogSeverityLevel.low,
        origin: 'check-service.ts'
      })
      this.callLogs(log)
      this.successCallback && this.successCallback()
      return true
    } catch (error) {
      const errorMessage = `${url} is not ok. ${error}`
      const log = new LogEntity({
        message: errorMessage,
        level: LogSeverityLevel.high,
        origin: 'check-service.ts'
      })
      this.callLogs(log)
      this.errorCallback && this.errorCallback(`${error}`)
      return false
    }
  }
}
