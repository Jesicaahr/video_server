const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = {
  signup: async (req, res, next) => {
    try {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      const newUser = new User({ ...req.body, password: hash });
      await newUser.save();

      const { password, ...others } = newUser._doc;

      res
        .status(201)
        .send({ message: 'Successfully create new user', user: others });
    } catch (err) {
      next(err);
    }
  },

  signin: async (req, res, next) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return next({
          name: 'Bad Request',
          message: 'Invalid email/password',
        });
      }
      const isCorrect = await bcrypt.compare(req.body.password, user.password);
      if (!isCorrect) {
        return next({
          name: 'Bad Request',
          message: 'Invalid email/password',
        });
      }

      const token = jwt.sign({ id: user._id }, process.env.SECRET);
      const { password, ...others } = user._doc;

      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(others);
    } catch (err) {
      next(err);
    }
  },

  google: (req, res) => {
    try {
    } catch (err) {}
  },
};
