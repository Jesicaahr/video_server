const User = require('../models/User');
const Video = require('../models/Video');
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
  getUser: async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return next({
          name: 'Not Found',
          message: 'User Not Found',
        });
      }
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  },
  //Subscribe a user
  subscribe: async (req, res, next) => {
    try {
      //Check if it same id with currentUser.id
      if (req.params.id == req.currentUser.id) {
        return next({
          name: 'Bad Request',
          message: 'Yo can not subscribe yourself',
        });
      }
      //start check params id is already subscribed/ no
      const listSubChannels = await User.findById(req.currentUser.id);
      const isSubscribed = listSubChannels.subscribedUsers.includes(
        req.params.id
      );
      if (isSubscribed) {
        return next({
          name: 'Bad Request',
          message: 'Already subscribed this channel',
        });
      }
      //finish checking

      await User.findByIdAndUpdate(req.params.id, {
        $inc: { subscribers: 1 },
      });
      await User.findByIdAndUpdate(req.currentUser.id, {
        $push: { subscribedUsers: req.params.id },
      });
      res.status(200).json({ message: 'Subscription successfull' });
    } catch (err) {
      next(err);
    }
  },
  //Unsubscribe a user
  unsubscribe: async (req, res, next) => {
    try {
      //start check params id is in list of subscribedUsers or no
      const listSubChannels = await User.findById(req.currentUser.id);
      const isSubscribed = listSubChannels.subscribedUsers.includes(
        req.params.id
      );
      if (!isSubscribed) {
        return next({
          name: 'Bad Request',
          message: 'Already unsubscribed this channel',
        });
      }
      //finish checking
      await User.findByIdAndUpdate(req.currentUser.id, {
        $pull: { subscribedUsers: req.params.id },
      });
      await User.findByIdAndUpdate(req.params.id, {
        $inc: { subscribers: -1 },
      });
      res.status(200).json({ message: 'Unsubscription successfull' });
    } catch (err) {
      next(err);
    }
  },
  //Like a video
  like: async (req, res, next) => {
    const id = req.currentUser.id;
    const videoId = req.params.videoId;
    try {
      await Video.findByIdAndUpdate(videoId, {
        $addToSet: { likes: id },
        $pull: { dislikes: id },
      });
      res.status(200).json({ message: 'The video has been liked' });
    } catch (err) {
      console.log(err);
      next(err);
    }
  },
  //Dislike a video
  dislike: async (req, res, next) => {
    const id = req.currentUser.id;
    const videoId = req.params.videoId;
    try {
      await Video.findByIdAndUpdate(videoId, {
        $addToSet: { dislikes: id },
        $pull: { likes: id },
      });
      res.status(200).json({ message: 'The video has been disliked' });
    } catch (err) {
      next(err);
    }
  },
};
