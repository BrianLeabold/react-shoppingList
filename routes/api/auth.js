const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
const jwtSecretKey = process.env.jwtSecret || config.get('jwtSecret');
// User Model
const User = require('../../models/User');

// @route  POST api/auth
// @desc   Authenticate users
// @access Public
router.post('/', (req, res) => {
  const { email, password } = req.body;
  //Simple Validation
  if (!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }
  //Check for existing user
  User.findOne({ email }).then(user => {
    if (!user) return res.status(400).json({ msg: 'User does not exist' });
    //Validate password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) return res.status(400).json({ msg: 'Invlid password' });
      jwt.sign(
        { id: user.id },
        jwtSecretKey,
        // 2 hours
        { expiresIn: 7200 },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email
            }
          });
        }
      );
    });
  });
});
// @route  GET api/auth/user
// @desc   Get user info
// @access Private
router.get('/user', auth, (req, res) => {
  User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user));
});

module.exports = router;
