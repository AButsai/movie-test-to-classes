import { FindOneOptions, Repository } from 'typeorm'
import { AppDataSource } from '../../data-source.js'
import { User } from '../../entity/user.js'
import { IUserService } from './interfaces.js'

export class UserService implements IUserService {
  private _service: Repository<User>
  constructor() {
    this._service = AppDataSource.getRepository(User)
  }

  async addUser(email: string, hashPass: string) {
    const user = new User()
    user.email = email
    user.password = hashPass
    const userInserted = await this._service.save(user)
    return userInserted
  }

  async getUser(field: keyof User, value: string) {
    const whereCondition: FindOneOptions<User> = { where: { [field]: value } }

    return await this._service.findOne(whereCondition)
  }
}
