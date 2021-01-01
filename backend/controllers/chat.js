const Chat = require('../models/chat')
const jwt = require('jsonwebtoken')
const { secret } = require('../config/environment')

function getChat(req, res) {
  Chat
    .find()

    .then(chat => {
      res.send(chat)
    })
    .catch(error => res.send(error))
}

function postMessage(req, res) {

  const currentUser = req.currentUser

  Chat
    .findOne({ region: req.body.region })

    .then(region => {

      const message = req.body
      delete message.region
      message.user = currentUser.username
      message.user_id = currentUser._id
      region.messages.push(message)

      res.send(region)
      region.save()
    })
    .catch(error => res.send(error))
}

function deleteMessage(req, res) {
  console.log('here')

  const reqMessage = req.body.message
  const reqRegion = req.body.region


  Chat
    .findOne({ region: reqRegion })

    .then(region => {

      const messagesInternal = region.messages

      const updatedMessages = []

      for (let i = 0; i < messagesInternal.length; i++) {

        if (messagesInternal[i].message !== reqMessage) {
          updatedMessages.push(messagesInternal[i])
        }

        else {
          console.log('message witch needs to be deleted')
        }

      }

      messagesInternal.splice(0, messagesInternal.length)

      updatedMessages.forEach((favourite) => {
        messagesInternal.push(favourite)
      })

      return region.save()

    })

    .then(region => res.send(region))
    .catch(err => res.send(err))

}






module.exports = {
  getChat,
  postMessage,
  deleteMessage

}