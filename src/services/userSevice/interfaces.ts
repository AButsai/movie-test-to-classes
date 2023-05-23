import { User } from '../../entity/user.js'

export interface IUserService {
  addUser(email: string, hashPass: string): Promise<User>
  getUser(field: keyof User, value: string, includePassword?: boolean): Promise<User | null>
}
