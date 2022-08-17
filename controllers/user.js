const User = require('../models/User');
module.exports = {
  //update user
  update: async (req, res, next) => {
    if (req.params.id === req.currentUser.id) {
      try {
        const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedUser);
      } catch (err) {
        next(err);
      }
    } else {
      return next({
        name: 'Forbidden',
        message: 'You can update only your account!',
      });
    }
  },
  //delete a user
  deleteUser: async (req, res, next) => {
    if (req.params.id === req.currentUser.id) {
      try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'User has been deleted' });
      } catch (err) {
        next(err);
      }
    } else {
      return next({
        name: 'Forbidden',
        message: 'You can delete only your account!',
      });
    }
  },
  //get a user
  getUser: (req, res, next) => {
    try {
    } catch (err) {
      next(err);
    }
  },
  //Subscribe a user
  subscribe: (req, res, next) => {
    try {
    } catch (err) {
      next(err);
    }
  },
  //Unsubscribe a user
  unsubscribe: (req, res, next) => {
    try {
    } catch (err) {
      next(err);
    }
  },
  //Like a video
  like: (req, res, next) => {
    try {
    } catch (err) {
      next(err);
    }
  },
  //Dislike a video
  dislike: (req, res, next) => {
    try {
    } catch (err) {
      next(err);
    }
  },
};
