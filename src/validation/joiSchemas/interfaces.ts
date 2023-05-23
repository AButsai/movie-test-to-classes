export interface IUserReg {
  username: string
  email: string
  password: string
}

export interface IUserLogin {
  email: string
  password: string
}

export interface IAddMovie {
  title: string
  director: string
  releaseDate: string
}
