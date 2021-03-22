const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../../config/general');

module.exports = {
  secure: (req, res, next)=>{
    try {
      req.tokenData = jwt.verify(req.headers.authorization.split(' ')[1], JWT_SECRET);
      next();
    } catch (error) {
      return res.status(401).json({msg: 'auth failed'});
    }
  },
  tokenData : (req, res, next)=>{
    try {
      req.tokenData = jwt.verify(req.headers.authorization.split(' ')[1], JWT_SECRET);
      next();
    } catch (error) {
      next();
    }
  },
  admin : (req, res, next)=>{
    try {
      req.tokenData = jwt.verify(req.headers.authorization.split(' ')[1], JWT_SECRET);
      if(!req.tokenData.admin_roles.includes("ADMIN")) res.status(401).json({msg: 'auth failed'});
      next();
    } catch (error) {
      return res.status(401).json({msg: 'auth failed'});
    }
  }
}