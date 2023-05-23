import { DeleteResult } from 'typeorm'
import { Movies } from '../../entity/movie.js'
import { User } from '../../entity/user.js'

export interface IMovieService {
  addMovie(user: User, { title, director, releaseDate }: IBody): Promise<Movies>
  updateMovieById(id: string, body: Partial<IBody>): Promise<Movies | null>
  getAllMovies(userId: string, skip: number, take: number): Promise<Movies[]>
  getMovieById(id: string): Promise<Movies | null>
  deleteMovie(id: string): Promise<DeleteResult>
}

export interface IBody {
  title: string
  director: string
  releaseDate: string
}
