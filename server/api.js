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

//GET get json list of all users
routes.get('/api/users', (req, res) => {
  rethink(c => {
    r.table('users').run(c, (err, response) => {
      sendJson(err, response, res)
    })
  })
})

//POST get json of a specific user
routes.post('/api/user', (req, res) => {
  rethink(c => {
    const { token } = req.body

    jwt.verify(token, secret, (err, token) => {
      //Since we signed the JWT with the original user object, we get the original object when verifying
      const { id } = token
      r.table('users').filter({ id }).run(c, (err, response) => {
        sendJson(err, response, res)
      })
    })

  })
})


//POST log a user in
routes.post('/api/users/login', (req, res) => {
  rethink(c => {
    r.table('users').filter({ username: req.body.username }).run(c, (err, response) => {
      response.toArray((err, response) => {
        const userExists = response.length > 0
        const user = response[0]
        if (userExists) {
          bcrypt.compare(req.body.password, user.hash).then(isPasswordChecked => {
            if (isPasswordChecked) {
              //Generate JWT
              jwt.sign({ id: user.id }, secret, { expiresIn: '1h' }, (err, token) => {
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

//POST sign a user up
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
              const id = response.generated_keys[0]
              r.table('users').get(id).run(c, (err, response) => {
                //Send back the token and log him in
                jwt.sign({ id }, secret, { expiresIn: '1h' }, (err, token) => {
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