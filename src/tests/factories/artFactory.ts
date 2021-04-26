import Art from '@Entities/Art'
import folderFactory from '@Factories/folderFactory'

const artFactory = (overrideProps: Record<string, unknown> = {}): Art => ({
  ...overrideProps,
  folder: folderFactory(),
  name: 'art',
  marginBetween: 10,
  items: [['red']],
  itemWidth: 10,
  id: 'id'
})

export default artFactory
