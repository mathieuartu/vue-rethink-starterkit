import express from 'express'
import r from 'rethinkdb'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { rethink, sendJson } from './rethinkdb.js'

export const routes = express.Router();

dotenv.load()

const secret = process.env.SECRET

//Error helpers
const generateErrorMessage = content => {
  return {
    content,
    error: true,
  }
}

const generateSuccessMessage = content => {
  return {
    content,
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
        const user = response[0]
        if (userExists) {
          bcrypt.compare(req.body.password, user.hash).then(isPasswordChecked => {
            if (isPasswordChecked) {
              //JWT
              jwt.sign({ user }, secret, { expiresIn: '1h' }, (err, token) => {
                if (err) console.log(err)
                res.send(generateSuccessMessage({
                  token,
                }))
              })
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
              const key = response.generated_keys[0]
              r.table('users').get(key).run(c, (err, response) => {
                //Send back the user object and log him in
                //JWT
                jwt.sign({ key }, secret, { expiresIn: '1h' }, (err, token) => {
                  if (err) console.log(err)
                  res.send(generateSuccessMessage({
                    token,
                  }))
                })
              })
            })
          })
        }
      })
    })
  })
})