/* eslint-disable @typescript-eslint/no-explicit-any */
import folderFactory from '@Factories/folderFactory'
import userFactory from '@Factories/userFactory'
import withFolderParamFactory from '@Middlewares/withFolderParam/factory'

describe('withFolderParam', () => {
  describe('when user and folder exists and belongs to folder', () => {
    let mockErrorCallback: any
    let mockNext: any
    let withFolderParam: any

    const mockUser = userFactory()
    const mockFolder = folderFactory()
    const mockRequest: any = {
      user: mockUser,
    }
    const mockResponse: any = {}
    const mockRepository: any = {
      findById: jest.fn().mockResolvedValue(mockFolder)
    }

    beforeEach(() => {
      mockNext = jest.fn()
      mockErrorCallback = jest.fn()
      withFolderParam = withFolderParamFactory(mockErrorCallback, mockRepository)
    })

    it('does not call errorCallback', async () => {
      await withFolderParam(mockRequest, mockResponse, mockNext)
  
      expect(mockErrorCallback).not.toHaveBeenCalled()
    })

    it('calls next when', async () => {
      await withFolderParam(mockRequest, mockResponse, mockNext)
  
      expect(mockNext).toHaveBeenCalled()
      expect(mockRequest.folder).toEqual(mockFolder)
    })
  })

  describe('when folder does not exist', () => {
    let mockErrorCallback: any
    let mockNext: any
    let withFolderParam: any

    const mockUser = userFactory()
    const mockRequest: any = {
      user: mockUser,
    }
    const mockResponse: any = {}
    const mockRepository: any = {
      findById: jest.fn().mockResolvedValue(null)
    }

    beforeEach(() => {
      mockNext = jest.fn()
      mockErrorCallback = jest.fn()
      withFolderParam = withFolderParamFactory(mockErrorCallback, mockRepository)
    })

    it('should call errorCallback', async () => {
      await withFolderParam(mockRequest, mockResponse, mockNext)
  
      expect(mockErrorCallback).toHaveBeenCalled()
    })

    it('should not call next', async () => {
      await withFolderParam(mockRequest, mockResponse, mockNext)
  
      expect(mockNext).not.toHaveBeenCalled()
    })
  })

  describe('when user does not exist', () => {
    let mockErrorCallback: any
    let mockNext: any
    let withFolderParam: any

    const mockFolder = folderFactory()
    const mockRequest: any = {}
    const mockResponse: any = {}
    const mockRepository: any = {
      findById: jest.fn().mockResolvedValue(mockFolder)
    }

    beforeEach(() => {
      mockNext = jest.fn()
      mockErrorCallback = jest.fn()
      withFolderParam = withFolderParamFactory(mockErrorCallback, mockRepository)
    })

    it('should call errorCallback', async () => {
      await withFolderParam(mockRequest, mockResponse, mockNext)
  
      expect(mockErrorCallback).toHaveBeenCalled()
    })

    it('should not call next', async () => {
      await withFolderParam(mockRequest, mockResponse, mockNext)
  
      expect(mockNext).not.toHaveBeenCalled()
    })
  })
})
