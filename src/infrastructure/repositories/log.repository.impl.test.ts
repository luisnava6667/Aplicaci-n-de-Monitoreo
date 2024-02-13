import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity'
import { LogRepositoryImpl } from './log.repository.impl'

describe('log.repository.impl.ts LogRepositoryImpl', () => {
  const mockLogdatasource = {
    saveLog: jest.fn(),
    getLog: jest.fn()
  }
  const logRepository = new LogRepositoryImpl(mockLogdatasource)
  beforeEach(() => {
    jest.clearAllMocks()
  })
  test('should saveLog call the datasource with arguments', async () => {
    const log = { level: LogSeverityLevel.high, message: 'hola' } as LogEntity
    await logRepository.saveLog(log)
    expect(mockLogdatasource.saveLog).toHaveBeenCalledWith(log)
  })
  test('should getLog call the datasource with arguments', async () => {
    await logRepository.getLog(LogSeverityLevel.low)
    expect(mockLogdatasource.getLog).toHaveBeenCalledWith(LogSeverityLevel.low)
  })
})
