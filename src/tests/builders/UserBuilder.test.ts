import UserBuilder from '@Builders/UserBuilder'
import userFactory from '@Factories/userFactory'

describe('UserBuilder', () => {
  describe('validations', () => {
    it('be an invalid user when username is empty', async () => {
      const userData = userFactory()
      const mockRepository: any = {
        findByUsername: jest.fn().mockResolvedValue(null)
      }
      const user = new UserBuilder(mockRepository)
        .setPassword(userData.password)
        .setConfirmPassword(userData.password)

      await expect(user.build).rejects.toThrow('Invalid username.')
    })

    it('be an invalid user when password is empty', async () => {
      const userData = userFactory()
      const mockRepository: any = {
        findByUsername: jest.fn().mockResolvedValue(null)
      }
      const user = new UserBuilder(mockRepository)
        .setUsername(userData.username)

      await expect(user.build).rejects.toThrow('Invalid password.')
    })

    it('be an invalid user when username is already taken', async () => {
      const userData = userFactory()
      const mockRepository: any = {
        findByUsername: jest.fn().mockResolvedValue(userData)
      }
      const user = new UserBuilder(mockRepository)
        .setUsername(userData.username)
        .setPassword(userData.password)
        .setConfirmPassword(userData.password)

      await expect(user.build).rejects.toThrow('Duplicated username.')
    })

    it('be an invalid user when password is different of confirm password', async () => {
      const userData = userFactory()
      const mockRepository: any = {
        findByUsername: jest.fn().mockResolvedValue(null)
      }
      const user = new UserBuilder(mockRepository)
        .setUsername(userData.username)
        .setPassword(userData.password)
        .setConfirmPassword('aaaa')

      await expect(user.build).rejects.toThrow('Password and confirm password are differents.')
    })

    it('be a valid user', async () => {
      const userData = userFactory()
      const mockRepository: any = {
        findByUsername: jest.fn().mockResolvedValue(null)
      }
      const user = new UserBuilder(mockRepository)
        .setUsername(userData.username)
        .setPassword(userData.password)
        .setConfirmPassword(userData.password)

      await expect(user.build()).resolves.not.toThrow()
    })
  })
})
