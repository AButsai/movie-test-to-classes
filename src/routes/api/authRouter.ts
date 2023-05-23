import { Router } from 'express'

import { Authentication } from '../../controllers/authCtrl/authCtrl.js'
import { controllerWrapper } from '../../middleware/controllerWrapper.js'
import { validationBody } from '../../middleware/validationBody.js'
import { validationSuccessToken } from '../../middleware/validationJWT.js'
import { UserService } from '../../services/userSevice/userService.js'
import { joiSchemaLogin, joiSchemaRegister } from '../../validation/joiSchemas/joiSchemas.js'

const userService = new UserService()
const user = new Authentication(userService)

const authRouter = Router()

authRouter.get('/logout', validationSuccessToken, controllerWrapper(user.logout.bind(user)))
authRouter.get('/current', validationSuccessToken, controllerWrapper(user.current.bind(user)))
authRouter.post('/register', validationBody(joiSchemaRegister), controllerWrapper(user.register.bind(user)))
authRouter.post('/login', validationBody(joiSchemaLogin), controllerWrapper(user.login.bind(user)))

export default authRouter
