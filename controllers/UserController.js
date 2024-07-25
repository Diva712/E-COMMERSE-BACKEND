const User = require('../models/UserModel')



const registerController = (req, res) => {
  res.send("<h1>Hello World</h1>")
}

module.exports = { registerController };