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
                user: 'Veronica',
                message: 'hey europe is cool!'
              },
              {
                user: 'Robert',
                message: 'I know! I will be back!'
              },
              {
                user: 'Kate',
                message: 'Paris: What a place, the history, architecture and culture is wonderful. So many sites to see, one more amazing then the next. A must see if you are going to visit the great cities of the world.'
              },
              {
                user: 'Paul',
                message: 'Very well worded, amazing city.'
              },
              {
                user: 'Amanda',
                message: 'Rome fulfils all that it promises. History, paintings, sculptures and food. The Vatican, the Colosseum,the Trevi fountain and lots more. Ideally a month would be less to savour all these things in some detail. The traffic is like all other major cities but the people are helpful. We were fortunate to have good weather except one evening when it rained. A good guide is a must, not only for the touristic angle but also for tips where to eat or grab a quick drink.'
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
                user: 'Veronica',
                message: 'Highlights: Nightlife and restaurants in New York City , the Staten Island ferry in New York, museums in Washington D.C., New England clam chowder, fall colours in New England, Philadelphia and train travel.'
              },
              {
                user: 'Paul',
                message: 'Loved it in NYC!'
              },
              {
                user: 'Robert',
                message: 'Expensive, especially for single travellers. With car hire and motels, difficult to get by on less than 100 USD/day, though sharing reduces these substantially as does using a  tent. Many motels will take 3-4 in a room for the same price of 1/2 pushing costs down to very cheap on a per person basis. New York and San Francisco as expensive as they come. Of course a visit based in one city staying in a hostel will run to about 50 USD/day. It is motels and car hire (if not split) that really eat the money. It is Americas big cities that are arguably the most interesting and where accommodation costs are by far the highest. With a car, staying in a motel outside a city, costs can be very much reduced, only having a car in cities is a nightmare and it can be expensive to park. Equally having a car (if shared) is one of the more cost effective ways to cover longer distances.'
              }
            ]
          },
          {
            region: 'South America',
            messages: [
              {
                user: 'Veronica',
                message: 'Anyone been to Brazil?'
              },
              {
                user: 'Amanda',
                message: 'yeah best summer of my life.'
              },
              {
                user: 'Robert',
                message: 'During summer (December-February) many Brazilians take holidays, making travel both difficult and expensive. At the same time, in Rio and the rest of the south the humidity is nasty. Summer is also the most festive time of year, as Brazilians escape their apartments and take to the beaches and streets. School holidays begin in mid-December and go through to Carnival, usually held in late February (the weekend and days before Ash Wednesday).'
              }

            ]
          },
          {
            region: 'Africa',
            messages: [
              {
                user: 'Kate',
                message: 'With your own kit Mount Kenya can be climbed independently (just hire a local guide). Even with an organised trip, a climb works out much cheaper than Kilimanjaro (although still not "cheap"), but beware that unlike Kilimanjaro, this is quite a technical mountain with most casual climbers not getting right to the jagged top.'
              },
              {
                user: 'Paul',
                message: 'Egypt has under gone dramatic political changes over the last few years and scenes of Cairos main square full of demonstrators become familiar to those that could be bothered to follow the extraordinary events that took place as a popular revolution removed not one, but two regimes. These images and the notion of Africas most popular (and Muslim) city is enough to put many off, however very few travellers wont have aspirations of standing in front of the pyramids or aside the Nile and for good reason.'
              }
            ]
          },
          {
            region: 'Oceania',
            messages: [
              {
                user: 'Kate',
                message: 'There is a huge variety and range of places to stay, and notably an excellent choice of hostels with good social scenes in most towns: book ahead for the best ones and for double rooms. Camping is widely available at campsites (if you can get to them with your own transport) or in some hostel gardens.'
              },
              {
                user: 'Jesse',
                message: 'i will be back there for sure!'
              },
              {
                user: 'Robert',
                message: 'If you want to stay longer than 3 months, you will need to complete an application form and lodge it either in person or by post with the embassy or consulate. It will cost AU$105 (or the equivalent in your country) and takes up to three weeks to process. If you think you might stay more than three months, it is best to get the longer visa before departure, because once you get to Australia extensions cost AU$160. Once issued, a visa usually allows multiple entries, so long as your passport is valid.'
              }
            ]
          },
          {
            region: 'Antarctica',
            messages: [
              {
                user: 'Kate',
                message: 'its cold here damn'
              },
              {
                user: 'David',
                message: 'A dream to go there one day!'
              }
            ]
          },
          {
            region: 'Other',
            messages: [
              {
                user: 'Paul',
                message: 'anyone planning a roadtrip in the summer?'
              },
              {
                user: 'Jesse',
                message: 'Im travelling from Portugal to Vietnam in July!'
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
