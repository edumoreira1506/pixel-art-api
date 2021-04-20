import User from '@Entities/User'

export type UserDTOType = {
  username: string;
  password: string;
}

export type FolderDTOType = {
  name: string;
  user: User;
}
