import Art from '@Entities/Art'
import Folder from '@Entities/Folder'
import ValidationError from '@Errors/ValidatonError'

export default class ArtBuilder {
  private _folder: Folder;
  private _name = '';
  private _itemWidth: number;
  private _marginBetween: number;
  private _items: Array<Array<string>>;

  setName(name: string): ArtBuilder {
    this._name = name

    return this
  }

  setFolder(folder: Folder): ArtBuilder {
    this._folder = folder

    return this
  }

  setItemWidth(itemWidth: number): ArtBuilder {
    this._itemWidth = itemWidth

    return this
  }

  setMarginBetween(marginBetween: number): ArtBuilder {
    this._marginBetween = marginBetween

    return this
  }

  setItems(items: Array<Array<string>>): ArtBuilder {
    this._items = items

    return this
  }

  validate(): void {
    const errors = []
  
    if (!this._folder) errors.push('Invalid folder.')
    if (!this._name) errors.push('Invalid name.')
    if (!this._marginBetween) errors.push('Invalid margin between.')
    if (!this._items) errors.push('Invalid items.')
    if (!this._itemWidth) errors.push('Invalid item width.')

    if (errors.length) {
      const errorMessage = errors.join(' ')

      throw new ValidationError(errorMessage)
    }
  }

  build = (): Art => {
    this.validate()

    const art = new Art()

    art.folder = this._folder
    art.name = this._name
    art.marginBetween = this._marginBetween
    art.items = this._items
    art.itemWidth = this._itemWidth

    return art
  }
}
