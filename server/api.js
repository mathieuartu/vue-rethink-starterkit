import express from 'express'
import r from 'rethinkdb'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { rethink, rethinkToArray } from './rethinkdb.js'

import nodemailer from 'nodemailer'
import { signupTemplate } from './email_templates/signupTemplate'

export const routes = express.Router();

dotenv.load()

const secret = process.env.SECRET

//Error helpers
const generateErrorMessage = content => ({
  content,
  error: true,
})

const generateSuccessMessage = content => ({
  content,
  error: false,
})

const sendEmail = async (type, info) => {

  const { SITE_NAME, ADMIN_EMAIL, MAILJET_KEY, MAILJET_PASS } = process.env
  const { username, email } = info

  let transporter = nodemailer.createTransport({
    host: "in-v3.mailjet.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: MAILJET_KEY, // generated ethereal user
      pass: MAILJET_PASS // generated ethereal password
    }
  })


  // send mail with defined transport object
  if (type === 'signup') {
    let message = await transporter.sendMail({
      from: `"${SITE_NAME} 👻" <${ADMIN_EMAIL}>`, // sender address
      to: email, // list of receivers
      subject: `Bienvenue sur ${SITE_NAME} 👋`, // Subject line
      text: "Hello world?", // plain text body
      html: signupTemplate({
        siteName: SITE_NAME,
        username,
      })
    })

    console.log("Message sent: %s", message.messageId)
  }
}



//AUTH MIDDLEWARE
const authMiddleware = (req, res, next) => {
  const auth = req.headers.authorization

  if (!auth || auth.split(' ')[0] !== 'Bearer') {
    res.sendStatus(403)
  }

  const token = auth.split(' ')[1]

  if (!token) {
    return res.sendStatus(403)
  }

  jwt.verify(token, secret, (err, token) => {

    if ((token && !token.id) || err) res.sendStatus(498)

    req.locals = { token }
    next()

  })
}


//GET get json list of all users : PROTECTED
routes.get('/api/users', authMiddleware, (req, res) => {
  rethink(c => {
    r.table('users').run(c, async (err, response) => {
      const users = await rethinkToArray(err, response)
      res.send(users)
    })
  })
})

//GET get json of a specific user : PROTECTED
routes.get('/api/user', authMiddleware, (req, res) => {
  rethink(c => {
    const { id } = req.locals.token

    //Since we signed the JWT with the original user object, we get the original object when verifying
    r.table('users').filter({ id }).run(c, async (err, response) => {
      const user = await rethinkToArray(err, response)
      if (!user || !user.length) res.sendStatus(404)

      res.send(user[0])
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
          const { username, password, email } = req.body
          bcrypt.hash(password, 10).then(hash => {
            r.table('users').insert({
              username,
              email,
              hash,
            }).run(c, (err, response) => {
              const id = response.generated_keys[0]
              r.table('users').get(id).run(c, () => {
                //Send back the token and log him in
                jwt.sign({ id }, secret, { expiresIn: '1h' }, (err, token) => {
                  if (err) console.log(err)
                  //Send email
                  sendEmail('signup', {
                    username,
                    email
                  })
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


//PATCH update user password
routes.patch('/api/user/password', authMiddleware, (req, res) => {
  const { oldPassword, newPassword } = req.body
  const { id } = req.locals.token

  //Since we signed the JWT with the original user object, we get the original object when verifying
  rethink(c => {
    r.table('users').filter({ id }).run(c, async (err, response) => {
      const user = await rethinkToArray(err, response)

      if (! await bcrypt.compare(oldPassword, user[0].hash)) {
        return res.status(403).send(generateErrorMessage('old_password_does_not_match'))
      }

      const newHash = await bcrypt.hash(newPassword, 10)
      r.table('users').get(id).update({ hash: newHash }).run(c, (err, response) => {
        res.status(202).send(generateSuccessMessage())
      })
    })
  })
})