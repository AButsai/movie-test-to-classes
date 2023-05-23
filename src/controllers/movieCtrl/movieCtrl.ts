import { Request, Response } from 'express'
import { ErrorUnauthorized } from '../../errors/ErrorProcessing.js'
import { MoviesService } from '../../services/movieService/movieService.js'
import { UserService } from '../../services/userSevice/userService.js'
import { IMovieController } from './interfaces.js'

export class MovieController implements IMovieController {
  private _movieService: MoviesService
  private _userService: UserService
  constructor(movieService: MoviesService, userService: UserService) {
    this._movieService = movieService
    this._userService = userService
  }

  private async getUser(email: string) {
    const user = await this._userService.getUser('email', email.toLowerCase().trim())
    if (!user) {
      throw new ErrorUnauthorized()
    }
    return user
  }

  async addMovie(req: Request, res: Response) {
    const { title, director, releaseDate } = req.body
    const { email } = req.user
    const user = await this.getUser(email)
    const movie = await this._movieService.addMovie(user, { title, director, releaseDate })
    res.status(200).json({ message: 'Success', data: { movie } })
  }

  async updateMovie(req: Request, res: Response) {
    const { title, director, releaseDate } = req.body
    const { email } = req.user
    const { movieId } = req.params
    await this.getUser(email)
    const movie = await this._movieService.updateMovieById(movieId, { title, director, releaseDate })
    res.status(200).json({ data: { movie } })
  }

  async getAllMovies(req: Request, res: Response) {
    const { email } = req.user
    let page = parseInt(req.query.page as string, 10)
    let limit = parseInt(req.query.limit as string, 10)
    if (isNaN(page) || page === undefined || isNaN(limit) || limit === undefined) {
      page = 0
      limit = 20
    }
    const skip = page * limit
    const user = await this.getUser(email)
    const movies = await this._movieService.getAllMovies(user.id, skip, limit)
    res.status(200).json({ data: { movies } })
  }

  async getMovieById(req: Request, res: Response) {
    const { email } = req.user
    const { movieId } = req.params
    await this.getUser(email)
    const movie = await this._movieService.getMovieById(movieId)
    res.status(200).json({ data: { movie } })
  }

  async deleteMovie(req: Request, res: Response) {
    const { email } = req.user
    const { movieId } = req.params
    await this.getUser(email)
    const movie = await this._movieService.deleteMovie(movieId)
    res.status(200).json({ message: 'Movie deleted' })
  }
}
