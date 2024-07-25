const jwt = require('jsonwebtoken');
const userModel = require('../models/UserModel');

const isAuthenticated = async (req, res) => {
  try {

    const { token } = req.cookies;
    if (!token) {
      return res.status(401).send({
        success: fakse,
        message: "UnAuthorized User !!",
      });
    }

    const decodeToken = await jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decodeToken._id);
    req.user = user;
    next();

  } catch (error) {
    res.status(500).send({
      success: "false",
      message: "Error In Auth Middleware",
      error,
    });
  }
}

module.exports = { isAuthenticated };

