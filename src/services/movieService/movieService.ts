import { Repository } from 'typeorm'
import { AppDataSource } from '../../data-source.js'
import { Movies } from '../../entity/movie.js'
import { User } from '../../entity/user.js'
import { IBody, IMovieService } from './interfaces.js'

export class MoviesService implements IMovieService {
  private _movies: Repository<Movies>
  private _user: Repository<User>
  constructor() {
    this._movies = AppDataSource.getRepository(Movies)
    this._user = AppDataSource.getRepository(User)
  }

  async addMovie(user: User, { title, director, releaseDate }: IBody) {
    const movie = new Movies()
    movie.title = title
    movie.director = director
    movie.releaseDate = releaseDate
    movie.user = this._user.getId(user)
    await this._movies.manager.save(movie)
    return movie
  }

  async updateMovieById(id: string, body: Partial<IBody>) {
    await this._movies.update(id, { ...body })
    return this._movies.findOne({ where: { id } })
  }

  async getAllMovies(userId: string, skip: number, take: number) {
    return await this._movies.find({ where: { user: { id: userId } }, skip, take })
  }

  async getMovieById(id: string) {
    return await this._movies.findOne({ where: { id } })
  }

  async deleteMovie(id: string) {
    return await this._movies.delete(id)
  }
}
