const router = require('express').Router();
const commentController = require('../controllers/comment');
const verifyToken = require('../verifyToken');

//add comment
router.post('/', verifyToken, commentController.addComment);
//delete comment
router.delete('/:videoId/:id', verifyToken, commentController.deleteComment);
//get comments
router.get('/:videoId', commentController.getComments);
module.exports = router;
