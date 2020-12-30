const express = require('express')
const router = express.Router()
const resortsController = require('./controllers/resorts')
const userController = require('./controllers/users')
const chatController = require('./controllers/chat')
const secureRoute = require('./middleware/secureRoute')

router.route('/resorts')
  .get(resortsController.getResorts)


router.route('/signup')
  .post(userController.createUser)

router.route('/chat')
  .get(chatController.getChat)

router.route('/chat/post')
  .post(chatController.postMessage)

router.route('/login')
  .post(userController.logInUser)

router.route('/users')
  .get(userController.getUsers)

router.route('/users/:accountId')
  .get(userController.singleUser)
  .delete(secureRoute, userController.removeUser)
  .put(secureRoute, userController.modifyUser)


router.route('/users/:name/favourite')
  .post(secureRoute, userController.addToFavourites)


// router.route('/resorts/:name/favourite/:favouritename')
//   .put(secureRoute, userController.deleteFromFavourites)



module.exports = router