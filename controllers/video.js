const Video = require('../models/Video');
const User = require('../models/User');

module.exports = {
  addVideo: async (req, res, next) => {
    const newVideo = new Video({ userId: req.currentUser.id, ...req.body });
    try {
      const savedVideo = await newVideo.save();
      res.status(201).json(savedVideo);
    } catch (err) {
      next(err);
    }
  },
  updateVideo: async (req, res, next) => {
    try {
      const video = await Video.findById(req.params.id);
      if (!video) {
        return next({
          name: 'Not Found',
          message: 'Video not found',
        });
      }
      if (video.userId === req.currentUser.id) {
        const updatedVideo = await Video.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedVideo);
      } else {
        return next({
          name: 'Forbidden',
          message: 'You can update only your video!',
        });
      }
    } catch (err) {
      next(err);
    }
  },
  deleteVideo: async (req, res, next) => {
    try {
      const video = await Video.findById(req.params.id);
      if (!video) {
        return next({
          name: 'Not Found',
          message: 'Video not found',
        });
      }
      if (video.userId === req.currentUser.id) {
        await Video.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Video has been deleted' });
      } else {
        return next({
          name: 'Forbidden',
          message: 'You can delete only your video!',
        });
      }
    } catch (err) {
      next(err);
    }
  },
  getVideo: async (req, res, next) => {
    try {
      const video = await Video.findById(req.params.id);
      if (video == null) {
        return next({
          name: 'Not Found',
          message: 'Video not found',
        });
      }
      res.status(200).json(video);
    } catch (err) {
      next(err);
    }
  },
  updateViews: async (req, res, next) => {
    try {
      await Video.findByIdAndUpdate(req.params.id, {
        $inc: { views: 1 },
      });
      res.status(200).json({ message: 'The view has been increased' });
    } catch (err) {
      next(err);
    }
  },
  getTrendingVideo: async (req, res, next) => {
    try {
      const videos = await Video.find().sort({ views: -1 });
      res.status(200).json(videos);
    } catch (err) {
      next(err);
    }
  },
  getRandomVideo: async (req, res, next) => {
    try {
      const videos = await Video.aggregate([{ $sample: { size: 20 } }]);
      res.status(200).json(videos);
    } catch (err) {
      next(err);
    }
  },
  getSubVideo: async (req, res, next) => {
    try {
      const user = await User.findById(req.currentUser.id);
      const subscribedChannels = user.subscribedUsers;

      const list = await Promise.all(
        subscribedChannels.map((channelId) => {
          return Video.find({ userId: channelId });
        })
      );
      res
        .status(200)
        .json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
    } catch (err) {
      next(err);
    }
  },
  getByTags: async (req, res, next) => {
    const tags = req.query.tags.split(',');
    try {
      const videos = await Video.find({ tags: { $in: tags } }).limit(20);
      res.status(200).json(videos);
    } catch (err) {
      next(err);
    }
  },
  searchVideo: async (req, res, next) => {
    const query = req.query.q;
    try {
      const videos = await Video.find({
        title: { $regex: query, $options: 'i' },
      }).limit(20);
      res.status(200).json(videos);
    } catch (err) {
      next(err);
    }
  },
};
