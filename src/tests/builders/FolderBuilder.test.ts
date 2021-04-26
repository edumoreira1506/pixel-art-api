import FolderBuilder from '@Builders/FolderBuilder'
import folderFactory from '@Factories/folderFactory'
import userFactory from '@Factories/userFactory'

describe('FolderBuilder', () => {
  describe('validations', () => {
    it('be an invalid folder when user is null', () => {
      const folderData = folderFactory()
      const folder = new FolderBuilder()
        .setName(folderData.name)

      expect(folder.build).toThrow('Invalid user.')
    })

    it('be an invalid folder when name is empty', () => {
      const user = userFactory()
      const folder = new FolderBuilder()
        .setUser(user)

      expect(folder.build).toThrow('Invalid name.')
    })
    
    it('be a valid folder', () => {
      const folderData = folderFactory()
      const user = userFactory()
      const folder = new FolderBuilder()
        .setName(folderData.name)
        .setUser(user)

      expect(folder.build).not.toThrow()
    })
  })
})
