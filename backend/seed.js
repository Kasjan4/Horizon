const mongoose = require('mongoose')
const User = require('./models/users')
const Chat = require('./models/chat')

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
            username: 'Admin',
            email: 'admin@admin.com',
            password: 'admin',
            passwordConfirmation: 'admin',
            image: 'https://i.imgur.com/uQyt00P.jpg',
            isAdmin: true,
            favourites: []

          },
          {
            username: 'Test',
            email: 'test@test.com',
            password: 'test',
            passwordConfirmation: 'test',
            image: 'https://i.imgur.com/uQyt00P.jpg',
            isAdmin: true,
            favourites: []
          },
          {
            username: 'Veronica',
            email: 'veronica@veronica.com',
            password: 'veronica',
            passwordConfirmation: 'veronica',
            image: 'https://i.imgur.com/uQyt00P.jpg',
            isAdmin: false,
            favourites: []
          },
          {
            username: 'David',
            email: 'david@david.com',
            password: 'david',
            passwordConfirmation: 'david',
            image: 'https://i.imgur.com/uQyt00P.jpg',
            isAdmin: false,
            favourites: []
          },
          {
            username: 'Paul',
            email: 'paul@paul.com',
            password: 'paul',
            passwordConfirmation: 'paul',
            image: 'https://i.imgur.com/uQyt00P.jpg',
            isAdmin: false,
            favourites: []
          },
          {
            username: 'Amanda',
            email: 'amanda@amanda.com',
            password: 'amanda',
            passwordConfirmation: 'amanda',
            image: 'https://i.imgur.com/uQyt00P.jpg',
            isAdmin: false,
            favourites: []
          },
          {
            username: 'Robert',
            email: 'robert@robert.com',
            password: 'robert',
            passwordConfirmation: 'robert',
            image: 'https://i.imgur.com/uQyt00P.jpg',
            isAdmin: false,
            favourites: []
          },
          {
            username: 'Jesse',
            email: 'jesse@jesse.com',
            password: 'jesse',
            passwordConfirmation: 'jesse',
            image: 'https://i.imgur.com/uQyt00P.jpg',
            isAdmin: false,
            favourites: []
          },
          {
            username: 'Kate',
            email: 'kate@kate.com',
            password: 'kate',
            passwordConfirmation: 'kate',
            image: 'https://i.imgur.com/uQyt00P.jpg',
            isAdmin: false,
            favourites: []
          }

        ])
      })

      .then(users => {
        console.log(`${users.length} users have been created`)
        return users
      })

      .then(() => {

        return Chat.create([
          {
            region: 'Europe',
            messages: [
              {
                user: 'Admin',
                message: 'hey europe is cool!'
              },
              {
                user: 'Robert',
                message: 'I know! I will be back!'
              },
              {
                user: 'Kate',
                message: 'i will be back!'
              }
            ]
          },
          {
            region: 'Asia',
            messages: [
              {
                user: 'Amanda',
                message: 'We had a wonderful holiday in Rajasthan which will remain long in the memory. India is a breathtakingly beautiful country full of splendid temples and palaces, noise and colour, peaceful rural scenes and most of all friendly welcoming people. We stayed in some amazing hotels and had brilliant guides who made us feel like friends.'
              },
              {
                user: 'Robert',
                message: 'Experience Travel Group organised a visit to Kerala. They put together an itinerary that suited us. We wanted to be more off the beaten track but still comfortable. Our stays at coffee and tea plantations, safari lodge, a beach resort and houseboat on the North Kerala backwaters, were delightful and exceeded our expectations.'
              },
              {
                user: 'Jesse',
                message: 'We did a flying visit to Muscat and should have stayed longer. Kerala was wonderful - the food amazing and the colours are an amazing assault on your senses. No beige to be seen. The cruise on the rice boat for two nights is a must and we were very fortunate to see tigers on two of our four safaris in Nagahole National Park. Mysore is a beautiful and the City Palace an incredible place to visit.'
              }
            ]
          },
          {
            region: 'North America',
            messages: [
              {
                user: 'admin',
                message: 'hey north america is cool!'
              },
              {
                user: 'test',
                message: 'i know right yeah!'
              },
              {
                user: 'admin',
                message: 'i will be back for sure!'
              }
            ]
          },
          {
            region: 'South America',
            messages: [
              {
                user: 'admin',
                message: 'hey south america is cool!'
              },
              {
                user: 'test',
                message: 'i know right yeah!'
              },
              {
                user: 'admin',
                message: 'i will be back for sure!'
              }
            ]
          },
          {
            region: 'Africa',
            messages: [
              {
                user: 'admin',
                message: 'hey africa is cool!'
              },
              {
                user: 'test',
                message: 'i know right yeah!'
              },
              {
                user: 'admin',
                message: 'i will be back for sure!'
              }
            ]
          },
          {
            region: 'Oceania',
            messages: [
              {
                user: 'admin',
                message: 'hey oceania is cool!'
              },
              {
                user: 'test',
                message: 'i know right yeah!'
              },
              {
                user: 'admin',
                message: 'i will be back for sure!'
              }
            ]
          },
          {
            region: 'Antarctica',
            messages: [
              {
                user: 'admin',
                message: 'hey antarctica is cool!'
              },
              {
                user: 'test',
                message: 'i know right yeah!'
              },
              {
                user: 'admin',
                message: 'i will be back for sure!'
              }
            ]
          },
          {
            region: 'Other',
            messages: [
              {
                user: 'admin',
                message: 'hey other is cool!'
              },
              {
                user: 'test',
                message: 'i know right yeah!'
              },
              {
                user: 'admin',
                message: 'i will be back for sure!'
              }
            ]
          }




        ])

      })


      .catch(err => {
        console.log(err)
      })

      .finally(() => {

        mongoose.connection.close()

      })
  }
)
