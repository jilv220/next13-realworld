export interface IUser {
  email: string
  username: string
  bio: string
  image: string
}

export interface IUserWithToken extends IUser {
  token: string
}
