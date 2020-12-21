const Resorts = require('../models/resorts')
const axios = require('axios')


function getResorts(req, res) {

  Resorts
    .find()
    .populate('user')
    .populate('comments.user')
    .then(resorts => {
      console.log('here')
      console.log(resorts)
      res.send(resorts)
    })

}











module.exports = {
  getResorts

}