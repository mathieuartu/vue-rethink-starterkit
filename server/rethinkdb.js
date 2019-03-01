import r from 'rethinkdb'
import bcrypt from 'bcrypt' //dev only

export const rethink = cb => {
  r.connect({
    port: process.env.DB_PORT,
    db: process.env.DB_NAME
  }).catch(err => {
    console.log(err)
  }).then(c => {
    cb(c)
  })
}

export const rethinkToArray = async (err, response) => {
  if (err) throw err
  const responseArray = await response.toArray()
  return responseArray
}

//INIT DB - ONLY FOR DEV
export const initDb = c => {
  r.tableDrop('users').run(c, (err, res) => {
    r.tableCreate('users').run(c, (err, res) => {
      bcrypt.hash('admin', 10).then(hash => {
        r.table('users').insert([
          {
            username: 'admin',
            hash,
            email: 'admin@admin.com',
            clothes: [
              {
                type: 'hat',
                contents: [
                  {
                    name: 'Casquette Norse Projects',
                    color: 'black',
                    picture_url: 'blabla.jpg'
                  },
                  {
                    name: 'Casquette Champion',
                    color: 'green',
                    picture_url: 'blabla.jpg'
                  }
                ]
              }
            ]
          }
        ]).run(c, (err, res) => {
          if (err) throw err
          // console.log(JSON.stringify(res, null, 2))
        })
      })
    })

  })
}
