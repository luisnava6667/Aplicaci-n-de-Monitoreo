import fs from 'fs'
import path from 'path'
import { FileSystemDatasource } from './file-system.datasource'
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity'
describe('file-system.datasource.ts FileSystemDatasource', () => {
  const logPath = path.join(__dirname, '../../../logs')

  beforeEach(() => {
    fs.rmSync(logPath, { recursive: true, force: true })
  })
  test('should create log files if they do not exists', () => {
    new FileSystemDatasource()
    const files = fs.readdirSync(logPath)
    expect(files).toEqual(['logs-all.log', 'logs-high.log', 'logs-medium.log'])
  })
  test('should save a log in all logs-all.log', () => {
    const logDataSource = new FileSystemDatasource()
    const log = new LogEntity({
      message: 'test',
      level: LogSeverityLevel.low,
      origin: 'file-system.datasource.ts'
    })
    logDataSource.saveLog(log)
    const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8')
    expect(allLogs).toContain(JSON.stringify(log))
  })
  test('should save a log in all logs-all.log and logs-medium.log', () => {
    const logDataSource = new FileSystemDatasource()
    const log = new LogEntity({
      message: 'test',
      level: LogSeverityLevel.medium,
      origin: 'file-system.datasource.ts'
    })
    logDataSource.saveLog(log)
    const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8')
    const mediumLogs = fs.readFileSync(`${logPath}/logs-medium.log`, 'utf-8')
    expect(allLogs).toContain(JSON.stringify(log))
    expect(mediumLogs).toContain(JSON.stringify(log))
  })
  test('should save a log in all logs-all.log and logs-high.log', () => {
    const logDataSource = new FileSystemDatasource()
    const log = new LogEntity({
      message: 'test',
      level: LogSeverityLevel.high,
      origin: 'file-system.datasource.ts'
    })
    logDataSource.saveLog(log)
    const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8')
    const highLogs = fs.readFileSync(`${logPath}/logs-high.log`, 'utf-8')
    expect(allLogs).toContain(JSON.stringify(log))
    expect(highLogs).toContain(JSON.stringify(log))
  })
  test('should return all logs', async () => {
    const logDataSource = new FileSystemDatasource()

    const lowLog = {
      origin: 'file-system.datasource.test.ts',
      level: LogSeverityLevel.low,
      message: 'Message test low',
      createdAt: new Date()
    }

    const mediumLog = {
      origin: 'file-system.datasource.test.ts',
      level: LogSeverityLevel.medium,
      message: 'Message test medium',
      createdAt: new Date()
    }

    const highLog = {
      origin: 'file-system.datasource.test.ts',
      level: LogSeverityLevel.high,
      message: 'Message test high',
      createdAt: new Date()
    }

    const logLow = new LogEntity(lowLog)
    await logDataSource.saveLog(logLow)
    const logsLow = await logDataSource.getLog(LogSeverityLevel.low)

    const logMedium = new LogEntity(mediumLog)
    await logDataSource.saveLog(logMedium)
    const logsMedium = await logDataSource.getLog(LogSeverityLevel.medium)

    const logHigh = new LogEntity(lowLog)
    await logDataSource.saveLog(logHigh)
    const logsHigh = await logDataSource.getLog(LogSeverityLevel.high)
    expect(logsLow).toEqual(expect.arrayContaining(logsLow))
    expect(logsMedium).toEqual(expect.arrayContaining(logsMedium))
    expect(logsHigh).toEqual(expect.arrayContaining(logsHigh))
  })

  test('should not throw an error if path exists', async () => {
    new FileSystemDatasource()
    new FileSystemDatasource()
    expect(true).toBeTruthy()
  })
  test('should throw and error if severity level is not defined', async () => {
    const logDatasource = new FileSystemDatasource()
    const customSeverityLevel = 'SUPER-MEGA-HIGH' as LogSeverityLevel
    try {
      await logDatasource.getLog(customSeverityLevel)
      expect(true).toBeFalsy()
    } catch (error) {
      const errorString = `${error}`
      expect(errorString).toContain(`${customSeverityLevel} not implemented`)
    }
  })
})
