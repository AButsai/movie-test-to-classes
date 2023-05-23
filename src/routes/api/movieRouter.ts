import { Router } from 'express'
import { MovieController } from '../../controllers/movieCtrl/movieCtrl.js'
import { controllerWrapper } from '../../middleware/controllerWrapper.js'
import { validationBody } from '../../middleware/validationBody.js'
import { validationSuccessToken } from '../../middleware/validationJWT.js'
import { MoviesService } from '../../services/movieService/movieService.js'
import { UserService } from '../../services/userSevice/userService.js'
import { joiSchemaAddMovie } from '../../validation/joiSchemas/joiSchemas.js'

const movieService = new MoviesService()
const userService = new UserService()
const movie = new MovieController(movieService, userService)

const movieRouter = Router()

movieRouter.use(validationSuccessToken)

movieRouter.post('/', validationBody(joiSchemaAddMovie), controllerWrapper(movie.addMovie.bind(movie)))

movieRouter.get('/', controllerWrapper(movie.getAllMovies.bind(movie)))

movieRouter.get('/:movieId', controllerWrapper(movie.getMovieById.bind(movie)))

movieRouter.patch('/:movieId', validationBody(joiSchemaAddMovie), controllerWrapper(movie.updateMovie.bind(movie)))

movieRouter.delete('/:movieId', controllerWrapper(movie.deleteMovie.bind(movie)))

export default movieRouter
