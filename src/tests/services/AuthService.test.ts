import AuthError from '@Errors/AuthError'
import AuthService from '@Services/AuthService'
import EncryptService from '@Services/EncryptService'

describe('AuthService', () => {
  describe('login', () => {
    it('should return the token', async () => {
      const mockUsername = 'username'
      const mockPassword = 'password'
      const user = { username: mockUsername, password: EncryptService.hash(mockPassword) }
      const mockRepository: any = {
        findByUsername: jest.fn().mockReturnValue(user)
      }
      const token = await AuthService.login(mockUsername, mockPassword, mockRepository)

      expect(typeof token).toEqual('string')
    })

    it('trigger AuthError when username is empty', () => {
      const mockRepository: any = null
      const mockUsername = ''
      const mockPassword = 'password'

      expect(AuthService.login(mockUsername, mockPassword, mockRepository)).rejects.toThrow(AuthError)
    })

    it('trigger AuthError when username is empty', () => {
      const mockRepository: any = null
      const mockUsername = 'username'
      const mockPassword = ''

      expect(AuthService.login(mockUsername, mockPassword, mockRepository)).rejects.toThrow(AuthError)
    })
  })
})
