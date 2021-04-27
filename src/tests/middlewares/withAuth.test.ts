/* eslint-disable @typescript-eslint/no-explicit-any */
import userFactory from '@Factories/userFactory'
import withAuthFactory from '@Middlewares/withAuth/factory'
import TokenService from '@Services/TokenService'

describe('withAuth', () => {
  describe('when user exists and is a valid token', () => {
    let mockErrorCallback: any
    let mockNext: any
    let withAuth: any
    let mockRequest: any
    let token: any

    const user = userFactory()
    const mockResponse: any = {}
    const mockRepository: any = {
      findById: jest.fn().mockResolvedValue(user)
    }

    beforeEach(async () => {
      token = await TokenService.create(user.username, user.password)
      mockRequest = {
        header: jest.fn().mockReturnValue(token)
      }
      mockNext = jest.fn()
      mockErrorCallback = jest.fn()    
      withAuth = withAuthFactory(mockErrorCallback, mockRepository)
    })

    it('should not call errorCallback', async () => {
      await withAuth(mockRequest, mockResponse, mockNext)
  
      expect(mockErrorCallback).not.toHaveBeenCalled()
    })

    it('should call next', async () => {
      await withAuth(mockRequest, mockResponse, mockNext)
  
      expect(mockNext).toHaveBeenCalled()
    })
  })

  describe('when user does not exist', () => {
    let mockErrorCallback: any
    let mockNext: any
    let withAuth: any
    let mockRequest: any
    let token: any

    const user = userFactory()
    const mockResponse: any = {}
    const mockRepository: any = {
      findById: jest.fn().mockResolvedValue(null)
    }

    beforeEach(async () => {
      token = await TokenService.create(user.username, user.password)
      mockRequest = {
        header: jest.fn().mockReturnValue(token)
      }
      mockNext = jest.fn()
      mockErrorCallback = jest.fn()    
      withAuth = withAuthFactory(mockErrorCallback, mockRepository)
    })

    it('should call errorCallback', async () => {
      await withAuth(mockRequest, mockResponse, mockNext)
  
      expect(mockErrorCallback).toHaveBeenCalled()
    })

    it('should not call next', async () => {
      await withAuth(mockRequest, mockResponse, mockNext)
  
      expect(mockNext).not.toHaveBeenCalled()
    })
  })

  describe('when token is a falsy value', () => {
    let mockErrorCallback: any
    let mockNext: any
    let withAuth: any

    const mockRequest: any = {
      header: jest.fn().mockResolvedValue(null)
    }
    const mockResponse: any = {}
    const mockRepository: any = {
      findById: jest.fn()
    }

    beforeEach(() => {
      mockNext = jest.fn()
      mockErrorCallback = jest.fn()
      withAuth = withAuthFactory(mockErrorCallback, mockRepository)
    })

    it('should call errorCallback', async () => {
      await withAuth(mockRequest, mockResponse, mockNext)
  
      expect(mockErrorCallback).toHaveBeenCalled()
    })

    it('should not call next', async () => {
      await withAuth(mockRequest, mockResponse, mockNext)
  
      expect(mockNext).not.toHaveBeenCalled()
    })
  })
})
