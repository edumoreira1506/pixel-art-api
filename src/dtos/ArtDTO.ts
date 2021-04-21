import Art from '@Entities/Art'
import Folder from '@Entities/Folder'
import ValidationError from '@Errors/ValidatonError'

export class ArtDTOBuilder {
  private _folder: Folder;
  private _name = '';
  private _itemWidth: number;
  private _marginBetween: number;
  private _items: Array<Array<string>>;

  setName(name: string): ArtDTOBuilder {
    this._name = name

    return this
  }

  setFolder(folder: Folder): ArtDTOBuilder {
    this._folder = folder

    return this
  }

  setItemWidth(itemWidth: number): ArtDTOBuilder {
    this._itemWidth = itemWidth

    return this
  }

  setMarginBetween(marginBetween: number): ArtDTOBuilder {
    this._marginBetween = marginBetween

    return this
  }

  setItems(items: Array<Array<string>>): ArtDTOBuilder {
    this._items = items

    return this
  }

  validate(): void {
    const errors = []
  
    if (!this._folder) errors.push('Invalid folder.')
    if (!this._name) errors.push('Invlaid name.')
    if (!this._marginBetween) errors.push('Invalid margin between.')
    if (!this._items) errors.push('Invalid items.')
    if (!this._itemWidth) errors.push('Invalid itemWidth')

    if (errors.length) {
      const errorMessage = errors.join(' ')

      throw new ValidationError(errorMessage).getError()
    }
  }

  build(): Promise<Art> {
    return new Promise((resolve, reject) => {
      try {
        this.validate()

        const art = new Art()

        art.folder = this._folder
        art.name = this._name
        art.marginBetween = this._marginBetween
        art.items = this._items
        art.itemWidth = this._itemWidth

        resolve(art)
      } catch(error) {
        reject(error)
      }
    })
  }
}
