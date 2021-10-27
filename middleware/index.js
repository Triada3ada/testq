const fs = require('fs');
const jwt = require('jsonwebtoken');
const {TokenExpiredError} = require('jsonwebtoken');

module.exports = {
  isAuthorized: (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
      if(req.method === 'GET') {
        return res.redirect('/auth/login');
      } else {
        return res.status(403).send({
          success: false,
          message: 'No token provided.'
        });
      }
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        switch (err.name) {
          case TokenExpiredError:
            res.status(400).json({
              success: false,
              message: 'Token is expired!'
            });
            break;
          default:
            res.status(400).json({
              success: false,
              message: 'Failed to authenticate token!'
            });
        }

      } else {
        next()
      }
    })
  }
};
