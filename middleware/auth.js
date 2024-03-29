const config = require('config');
const jwt = require('jsonwebtoken');
//const jwtSecretKey = process.env.jwtSecret || config.get('jwtSecret');
function auth(req, res, next) {
  const token = req.header('x-auth-token');
  //Check token
  if (!token)
    return res.status(401).json({ msg: 'No token, authorization denied' });
  try {
    //Verify token
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    //Add user from payload
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({ msg: 'Token is invalid' });
  }
}
module.exports = auth;
