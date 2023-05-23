import { Request, Response } from 'express'

export interface IAuthentication {
  register(req: Request, res: Response): Promise<void>
  login(req: Request, res: Response): Promise<void>
  logout(req: Request, res: Response): Promise<void>
  current(req: Request, res: Response): Promise<void>
}
