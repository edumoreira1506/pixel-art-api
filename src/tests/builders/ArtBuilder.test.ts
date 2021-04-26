import ArtBuilder from '@Builders/ArtBuilder'
import artFactory from '@Factories/artFactory'

describe('ArtBuilder', () => {
  describe('validations', () => {
    it('be an invalid art when name is empty', () => {
      const artData = artFactory()
      const art = new ArtBuilder()
        .setFolder(artData.folder)
        .setMarginBetween(artData.marginBetween)
        .setItems(artData.items)
        .setItemWidth(artData.itemWidth)

      expect(art.build).toThrow('Invalid name.')
    })

    it('be an invalid art when folder is empty', () => {
      const artData = artFactory()
      const art = new ArtBuilder()
        .setName(artData.name)
        .setMarginBetween(artData.marginBetween)
        .setItems(artData.items)
        .setItemWidth(artData.itemWidth)

      expect(art.build).toThrow('Invalid folder.')
    })

    it('be an invalid art when margin between is empty', () => {
      const artData = artFactory()
      const art = new ArtBuilder()
        .setName(artData.name)
        .setFolder(artData.folder)
        .setItems(artData.items)
        .setItemWidth(artData.itemWidth)

      expect(art.build).toThrow('Invalid margin between.')
    })

    it('be an invalid art when item width is empty', () => {
      const artData = artFactory()
      const art = new ArtBuilder()
        .setName(artData.name)
        .setFolder(artData.folder)
        .setMarginBetween(artData.marginBetween)
        .setItems(artData.items)

      expect(art.build).toThrow('Invalid item width.')
    })

    it('be an invalid art when items is empty', () => {
      const artData = artFactory()
      const art = new ArtBuilder()
        .setName(artData.name)
        .setFolder(artData.folder)
        .setMarginBetween(artData.marginBetween)
        .setItemWidth(artData.itemWidth)

      expect(art.build).toThrow('Invalid items.')
    })

    it('be a valid art', () => {
      const artData = artFactory()
      const art = new ArtBuilder()
        .setName(artData.name)
        .setFolder(artData.folder)
        .setMarginBetween(artData.marginBetween)
        .setItems(artData.items)
        .setItemWidth(artData.itemWidth)

      expect(art.build).not.toThrow()
    })
  })
})
