import express from 'express'
import r from 'rethinkdb'
import { rethink, sendJson } from './rethinkdb.js'

export const routes = express.Router();

routes.get('/api/status', (req, res) => {
  res.send({ status: 'ok' });
})

routes.get('/api/users', (req, res) => {
  rethink(c => {
    r.table('users').run(c, (err, response) => {
      sendJson(err, response, res)
    })
  })
})

