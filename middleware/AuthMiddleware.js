const JWT = require('jsonwebtoken');
const userModel = require('../models/UserModel');

//user auth
// const jwt = require('jsonwebtoken');
// const userModel = require('../models/userModel'); // Adjust the path to your user model as needed

const isAuthenticated = async (req, res, next) => {
  try {
    // Extract the token from the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).send({
        success: false,
        message: 'UnAuthorized User',
      });
    }

    const token = authHeader.split(' ')[1];

    // Validate the token
    const decodeData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await userModel.findById(decodeData._id);

    if (!req.user) {
      return res.status(401).send({
        success: false,
        message: 'UnAuthorized User',
      });
    }

    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).send({
      success: false,
      message: 'UnAuthorized User',
    });
  }
};



//user admin
const isAdmin = async (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(401).send({
      success: false,
      message: "admin only",
    })
  }
  next();
}


module.exports = { isAuthenticated, isAdmin };

