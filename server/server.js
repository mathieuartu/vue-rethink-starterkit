// HTTP SERVER
import express from 'express'
import cors from 'cors'
import logger from 'morgan'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import dotenv from 'dotenv'

dotenv.load()

const app = express()

app.use(logger('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors({
  origin: '*', // Be sure to switch to your production domain
  optionsSuccessStatus: 200
}))
app.use(helmet())

app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({ error: error.message })
})

//Rethinkdb
//Db init & imports
import { rethink, sendJson, initDb } from './rethinkdb.js'
rethink(c => initDb(c)) //Dev only

//API
import { routes } from './api.js'
app.use('/', routes)

//Server
app.listen(5000, () => {
  console.log(`The server is running and listening at http://localhost:5000`)
})