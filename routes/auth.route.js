import express from 'express'
import {LoginController, LogoutController} from '../controllers/auth.controller.js'
import {verifyToken} from '../middleware/auth.middleware.js'
import {AuthRequest} from '../requests/AuthRequest.js'

const route = express.Router()

route.post('/login', AuthRequest, LoginController)
route.post('/logout', verifyToken, LogoutController)

export default route