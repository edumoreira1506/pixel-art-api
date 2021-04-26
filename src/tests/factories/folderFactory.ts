import Folder from '@Entities/Folder'
import userFactory from '@Factories/userFactory'

const folderFactory = (overrideProps: Record<string, unknown> = {}): Folder => ({
  ...overrideProps,
  name: 'art',
  id: 'id',
  user: userFactory(),
  arts: [],
})

export default folderFactory
