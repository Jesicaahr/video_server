const Comment = require('../models/Comment');
const Video = require('../models/Video');

module.exports = {
  addComment: async (req, res, next) => {
    const newComment = new Comment({ ...req.body, userId: req.currentUser.id });
    try {
      const savedComment = await newComment.save();
      res.status(201).json(savedComment);
    } catch (err) {
      next(err);
    }
  },

  deleteComment: async (req, res, next) => {
    try {
      const video = await Video.findById(req.params.videoId);
      const comment = await Comment.findById(req.params.id);
      console.log(comment);
      if (req.params.videoId !== comment.videoId) {
        return next({
          name: 'Bad Request',
          message: 'Can not delete this comment',
        });
      }
      if (
        req.currentUser.id == comment.userId ||
        req.currentUser.id == video.userId
      ) {
        await Comment.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'The comment has been deleted' });
      } else {
        return next({
          name: 'Forbidden',
          message: 'You can delete only your comment!',
        });
      }
    } catch (err) {
      next(err);
    }
  },

  getComments: async (req, res, next) => {
    try {
      const comments = await Comment.find({ videoId: req.params.videoId });
      res.status(200).json(comments.sort((a, b) => b.createdAt - a.createdAt));
    } catch (err) {
      next(err);
    }
  },
};
