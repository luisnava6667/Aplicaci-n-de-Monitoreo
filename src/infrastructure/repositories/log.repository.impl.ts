import { LogDataSource } from '../../domain/datasources/log.datasource'
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity'
import { LogRepository } from '../../domain/repository/log.repository'

export class LogRepositoryImpl implements LogRepository {
  //   private logDatasource: LogDataSource
  constructor(private readonly logDatasource: LogDataSource) {}
  async saveLog(log: LogEntity): Promise<void> {
    return this.logDatasource.saveLog(log)
  }
  async getLog(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    return this.logDatasource.getLog(severityLevel)
  }
}
