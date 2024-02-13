import { envs } from './envs.plugins'

describe('env.plugins.ts', () => {
  test('should return env options', () => {
    expect(envs).toEqual({
      PORT: 3000,
      MAILER_SERVICE: 'gmail',
      MAILER_EMAIL: 'navaluisrodolfo@gmail.com',
      MAILER_SECRET_KEY: 'eutvqslmiklrjjft',
      PROD: false,
      MONGO_URL: 'mongodb://luis:159159@localhost:27017',
      MONGO_DB_NAME: 'NOC-TEST',
      MONGO_USER: 'luis',
      MONGO_PASS: '159159'
    })
  })
  test('should return error if not found env', async () => {
    jest.resetModules()
    process.env.PORT = 'ABC'
    try {
      await import('./envs.plugins')
      expect(true).toBe(false)
    } catch (error) {
      expect(`${error}`).toContain('"PORT" should be a valid integer')
    }
  })
})
