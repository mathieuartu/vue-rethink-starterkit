import express from 'express'
import r from 'rethinkdb'
import bcrypt from 'bcrypt'
import { rethink, sendJson } from './rethinkdb.js'

export const routes = express.Router();

//Error helpers
const generateErrorMessage = message => {
  return {
    message,
    error: true,
  }
}

const generateSuccessMessage = data => {
  return {
    data,
    error: false,
  }
}


//GET

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


//POST

routes.post('/api/users/login', (req, res) => {
  rethink(c => {
    r.table('users').filter({ username: req.body.username }).run(c, (err, response) => {
      response.toArray((err, response) => {
        const userExists = response.length > 0
        if (userExists) {
          const user = response[0]
          bcrypt.compare(req.body.password, user.hash).then(isPasswordChecked => {
            if (isPasswordChecked) {
              res.send(generateSuccessMessage(user))
            } else {
              res.send(generateErrorMessage('password_does_not_match'))
            }
          })
        } else {
          res.send(generateErrorMessage('user_does_not_exists'))
        }
      })
    })
  })
})

routes.post('/api/users/signup', (req, res) => {
  rethink(c => {
    r.table('users').filter({ username: req.body.username }).run(c, (err, response) => {
      response.toArray((err, response) => {
        const userExists = response.length > 0
        if (userExists) {
          res.send(generateErrorMessage('user_already_exists'))
        } else {
          //Write user in db
          const { username, password } = req.body
          bcrypt.hash(password, 10).then(hash => {
            r.table('users').insert({
              username,
              hash,
            }).run(c, (err, response) => {
              r.table('users').get(response.generated_keys[0]).run(c, (err, response) => {
                //Send back the user object
                res.send(generateSuccessMessage(response))
              })
            })
          })
        }
      })
    })
  })
})