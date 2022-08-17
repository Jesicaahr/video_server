const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next({
      name: 'Unauthorized',
      message: 'User not authenticated!',
    });
  }
  jwt.verify(token, process.env.SECRET, (err, user) => {
    if (err) {
      return next({
        name: 'Forbidden',
        message: 'Token is not valid!',
      });
    }
    req.currentUser = user;
    next();
  });
};

module.exports = verifyToken;
