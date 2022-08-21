const router = require('express').Router();
const userController = require('../controllers/user');
const verifyToken = require('../verifyToken');

//update a user
router.put('/:id', verifyToken, userController.update);
//delete a user
router.delete('/:id', verifyToken, userController.deleteUser);
//get a user
router.get('/find/:id', userController.getUser);
//subscribe a user
router.put('/sub/:id', verifyToken, userController.subscribe);
//unsubscribe a user
router.put('/unsub/:id', verifyToken, userController.unsubscribe);
//like a video
router.put('/like/:videoId', verifyToken, userController.like);
//dislike a video
router.put('/dislike/:videoId', verifyToken, userController.dislike);

module.exports = router;
