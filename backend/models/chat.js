const mongoose = require('mongoose')



const schema = new mongoose.Schema({
  region: { type: String, required: true, unique: true },
  messages: { type: Array }

})


module.exports = mongoose.model('Chat', schema)

