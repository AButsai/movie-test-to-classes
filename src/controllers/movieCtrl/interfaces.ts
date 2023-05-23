import { Request, Response } from 'express'

export interface IMovieController {
  addMovie(req: Request, res: Response): Promise<void>
  updateMovie(req: Request, res: Response): Promise<void>
  getAllMovies(req: Request, res: Response): Promise<void>
  getMovieById(req: Request, res: Response): Promise<void>
  deleteMovie(req: Request, res: Response): Promise<void>
}
