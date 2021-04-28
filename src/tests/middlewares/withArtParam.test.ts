/* eslint-disable @typescript-eslint/no-explicit-any */
import artFactory from '@Factories/artFactory'
import folderFactory from '@Factories/folderFactory'
import userFactory from '@Factories/userFactory'
import { withArtParamFactory } from '@Middlewares/withArtParam'

describe('withArtParam', () => {
  describe('when art, user and folder exists and belongs to folder', () => {
    let mockErrorCallback: any
    let mockNext: any
    let withArtParam: any

    const mockUser = userFactory()
    const mockFolder = folderFactory()
    const mockArt = artFactory({ folder: mockFolder })
    const mockRequest: any = {
      user: mockUser,
      folder: mockFolder
    }
    const mockResponse: any = {}
    const mockRepository: any = {
      findById: jest.fn().mockResolvedValue(mockArt)
    }

    beforeEach(() => {
      mockNext = jest.fn()
      mockErrorCallback = jest.fn()
      withArtParam = withArtParamFactory(mockErrorCallback, mockRepository)
    })

    it('does not call errorCallback', async () => {
      await withArtParam(mockRequest, mockResponse, mockNext)
  
      expect(mockErrorCallback).not.toHaveBeenCalled()
    })

    it('calls next when', async () => {
      await withArtParam(mockRequest, mockResponse, mockNext)
  
      expect(mockNext).toHaveBeenCalled()
      expect(mockRequest.art).toEqual(mockArt)
    })
  })

  describe('when art does not belongs to folder', () => {
    let mockErrorCallback: any
    let mockNext: any
    let withArtParam: any

    const mockUser = userFactory()
    const mockFolder = folderFactory()
    const mockArt = artFactory()
    const mockRequest: any = {
      user: mockUser,
      folder: mockFolder
    }
    const mockResponse: any = {}
    const mockRepository: any = {
      findById: jest.fn().mockResolvedValue(mockArt)
    }

    beforeEach(() => {
      mockNext = jest.fn()
      mockErrorCallback = jest.fn()
      withArtParam = withArtParamFactory(mockErrorCallback, mockRepository)
    })

    it('does not call errorCallback', async () => {
      await withArtParam(mockRequest, mockResponse, mockNext)
  
      expect(mockErrorCallback).not.toHaveBeenCalled()
    })

    it('calls next when', async () => {
      await withArtParam(mockRequest, mockResponse, mockNext)
  
      expect(mockNext).toHaveBeenCalled()
    })
  })

  describe('when folder does not exist', () => {
    let mockErrorCallback: any
    let mockNext: any
    let withArtParam: any

    const mockUser = userFactory()
    const mockArt = artFactory()
    const mockRequest: any = {
      user: mockUser,
    }
    const mockResponse: any = {}
    const mockRepository: any = {
      findById: jest.fn().mockResolvedValue(mockArt)
    }

    beforeEach(() => {
      mockNext = jest.fn()
      mockErrorCallback = jest.fn()
      withArtParam = withArtParamFactory(mockErrorCallback, mockRepository)
    })

    it('calls errorCallback', async () => {
      await withArtParam(mockRequest, mockResponse, mockNext)
  
      expect(mockErrorCallback).toHaveBeenCalled()
    })

    it('does not call next when', async () => {
      await withArtParam(mockRequest, mockResponse, mockNext)
  
      expect(mockNext).not.toHaveBeenCalled()
    })
  })

  describe('when user does not exist', () => {
    let mockErrorCallback: any
    let mockNext: any
    let withArtParam: any

    const mockFolder = folderFactory()
    const mockArt = artFactory({ folder: mockFolder })
    const mockRequest: any = {
      folder: mockFolder
    }
    const mockResponse: any = {}
    const mockRepository: any = {
      findById: jest.fn().mockResolvedValue(mockArt)
    }

    beforeEach(() => {
      mockNext = jest.fn()
      mockErrorCallback = jest.fn()
      withArtParam = withArtParamFactory(mockErrorCallback, mockRepository)
    })

    it('calls errorCallback', async () => {
      await withArtParam(mockRequest, mockResponse, mockNext)
  
      expect(mockErrorCallback).toHaveBeenCalled()
    })

    it('does not call next when', async () => {
      await withArtParam(mockRequest, mockResponse, mockNext)
  
      expect(mockNext).not.toHaveBeenCalled()
    })
  })

  describe('when art does not exist', () => {
    let mockErrorCallback: any
    let mockNext: any
    let withArtParam: any

    const mockRequest: any = null
    const mockResponse: any = {}
    const mockRepository: any = {
      findById: jest.fn().mockResolvedValue(null)
    }

    beforeEach(() => {
      mockNext = jest.fn()
      mockErrorCallback = jest.fn()
      withArtParam = withArtParamFactory(mockErrorCallback, mockRepository)
    })

    it('calls errorCallback', async () => {
      await withArtParam(mockRequest, mockResponse, mockNext)
  
      expect(mockErrorCallback).toHaveBeenCalled()
    })

    it('does not call next when', async () => {
      await withArtParam(mockRequest, mockResponse, mockNext)
  
      expect(mockNext).not.toHaveBeenCalled()
    })
  })
})
