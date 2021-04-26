import User from '@Entities/User'

const userFactory = (overrideProps: Record<string, unknown> = {}): User => ({
  ...overrideProps,
  username: 'username',
  id: 'id',
  password: 'password',
  folders: []
})

export default userFactory
