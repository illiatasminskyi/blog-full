import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { routerUser, routerPost, routerAuth } from './routers/index.js'
import * as dotenv from 'dotenv'
dotenv.config()

mongoose
	.connect(process.env.LINK)
	.then(() => console.log('Connect success'))
	.catch(err => console.log('Connect error', err))

const app = express()
app.use(express.json())
app.use(cors())

app.use('/auth', routerAuth)
app.use('/user', routerUser)
app.use('/', routerPost)

app.listen(process.env.PORT, err => {
	if (err) return console.log(err)
	console.log('listening on port ' + process.env.PORT)
})
