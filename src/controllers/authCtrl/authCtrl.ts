import { Request, Response } from 'express'
import { ErrorEmailExist, ErrorLogin, ErrorNotFound, ErrorUnauthorized } from '../../errors/ErrorProcessing.js'
import { comparePassword, createHashPassport } from '../../helpers/bcrypt.js'
import { generateTokens } from '../../helpers/jwt.js'
import { UserService } from '../../services/userSevice/userService.js'
import { IAuthentication } from './interfaces.js'

export class Authentication implements IAuthentication {
  private _services: UserService
  constructor(services: UserService) {
    this._services = services
  }

  async register(req: Request, res: Response) {
    const { email, password } = req.body
    const candidate = await this._services.getUser('email', email.toLowerCase().trim())
    if (candidate) {
      throw new ErrorEmailExist()
    }
    const hashPass = createHashPassport(password)
    const newUser = await this._services.addUser(email.toLowerCase().trim(), hashPass)
    const tokens = await generateTokens(newUser.email, newUser.id)
    res.cookie('refreshToken', tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 100, httpOnly: true })
    res.status(200).json({ message: 'success', token: tokens.accessToken })
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body
    const candidate = await this._services.getUser('email', email.toLowerCase().trim())
    if (!candidate || !comparePassword(password, candidate.password)) {
      throw new ErrorLogin()
    }
    const tokens = await generateTokens(candidate.email, candidate.id)
    res.cookie('refreshToken', tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 100, httpOnly: true })
    res.status(200).json({ message: 'success', token: tokens.accessToken })
  }

  async logout(req: Request, res: Response) {
    const { email } = req.user
    const candidate = await this._services.getUser('email', email.toLowerCase().trim())
    if (!candidate) {
      throw new ErrorUnauthorized()
    }
    res.clearCookie('refreshToken')
    res.status(204).json({ message: 'Disconnect...' })
  }

  async current(req: Request, res: Response) {
    const { email } = req.user
    const user = await this._services.getUser('email', email.toLowerCase().trim())
    if (!user) {
      throw new ErrorNotFound()
    }
    const tokens = await generateTokens(user.email, user.id)
    res.cookie('refreshToken', tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 100, httpOnly: true })
    res.status(200).json({ message: 'success', token: tokens.accessToken, user })
  }
}
