const mongoose = require('mongoose')
const User = require('./models/users')
const { dbURI } = require('./config/environment')


mongoose.connect(
  dbURI,

  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (err) => {

    if (err) return console.log(err)
    console.log('Mongoose connected!')

    mongoose.connection.db.dropDatabase()

      .then(() => {
        return User.create([
          {
            username: 'admin',
            email: 'admin@admin.com',
            password: 'admin',
            passwordConfirmation: 'admin',
            image: '/img/first.png',
            isAdmin: true,
            favourites: []
          }

        ])
      })

      .then(users => {
        console.log(`${users.length} users have been created`)
        return users
      })

      
      
      .catch(err => {
        console.log(err)
      })

      .finally(() => {

        mongoose.connection.close()

      })
  }
)
