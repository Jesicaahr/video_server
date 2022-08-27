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
          name: 'Unauthorized',
          message: 'Invalid email/password',
        });
      }
      const isCorrect = await bcrypt.compare(req.body.password, user.password);
      if (!isCorrect) {
        return next({
          name: 'Unauthorized',
          message: 'Invalid email/password',
        });
      }

      const token = jwt.sign({ d: user._id }, process.env.SECRET);
      // const { password, ...others } = user._doc;
      const data = {
        name: user.name,
        email: user.email,
        img: user.img,
        access_token: token,
      };

      res
        // .cookie('access_token', token, { httpOnly: true })
        .status(200)
        // .json({ others, access_token: token });
        .json(data);
    } catch (err) {
      next(err);
    }
  },

  googleAuth: async (req, res, net) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        const token = jwt.sign({ id: user._id }, process.env.SECRET);

        const data = {
          name: user.name,
          email: user.email,
          img: user.img,
          access_token: token,
        };

        res.status(200).json(data);
      } else {
        const newUser = new User({ ...req.body, fromGoogle: true });
        const savedUser = await newUser.save();
        const token = jwt.sign({ id: savedUser._id }, process.env.SECRET);

        const data = {
          name: savedUser.name,
          email: savedUser.email,
          img: savedUser.img,
          access_token: token,
        };

        res.status(200).json(data);
      }
    } catch (err) {
      next(err);
    }
  },
};
