import { LogEntity } from '../../entities/log.entity'
import { CheckService } from './check-service'

describe('check-service.ts CheckService UseCase', () => {
  const mockRepository = {
    saveLog: jest.fn(),
    getLog: jest.fn()
  }
  const successCallback = jest.fn()
  const errorCallback = jest.fn()
  const checkService = new CheckService(
    mockRepository,
    successCallback,
    errorCallback
  )
  beforeEach(() => {
    jest.clearAllMocks()
  })
  test('should call successCalback when fetch return false ', async () => {
    const wasOk = await checkService.execute('https://www.google.com')
    expect(wasOk).toBe(true)
    expect(successCallback).toHaveBeenCalled()
    expect(errorCallback).not.toHaveBeenCalled()
    expect(mockRepository.saveLog).toBeCalledWith(expect.any(LogEntity))
  })
  test('should call successCalback when fetch return true ', async () => {
    const wasOk = await checkService.execute('https://www.gasdasdasdoogle.com')
    expect(wasOk).toBe(false)
    expect(successCallback).not.toHaveBeenCalled()
    expect(errorCallback).toHaveBeenCalled()
    expect(mockRepository.saveLog).toBeCalledWith(expect.any(LogEntity))
  })
})
