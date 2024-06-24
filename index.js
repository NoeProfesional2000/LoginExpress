import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import LoginRoute from './routes/auth.route.js'
import UserRoute  from './routes/user.route.js'
import cors from 'cors'
import {connect, disconnect} from './server/conexion.js'

dotenv.config()
const app = express()
const port = process.env.EXPRESS_APP_PORT || 3000

app.use(cors())
app.set('/static', express.static('static'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use('/api/v1', [
    LoginRoute,
    UserRoute
])

app.listen(port, () => {
    connect()
    console.log(`Server is running on port ${port}...`)
})