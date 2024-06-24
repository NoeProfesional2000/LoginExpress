import express from 'express'
import {getUsersController, getOneUserController, storeUserController, editUserController, changeStatusUserController} from '../controllers/user.controller.js'
import {verifyToken} from '../middleware/auth.middleware.js'

const route = express.Router()

route.get('/users', verifyToken, getUsersController)
route.get('/users/:id', verifyToken, getOneUserController)
route.post('/users', storeUserController)
route.put('/users/:id', verifyToken, editUserController)
route.put('/users/:id/status', verifyToken, changeStatusUserController)

export default route