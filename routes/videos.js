const router = require('express').Router();
const videoController = require('../controllers/video');
const verifyToken = require('../verifyToken');

//create a video
router.post('/', verifyToken, videoController.addVideo);
//update video
router.put('/:id', verifyToken, videoController.updateVideo);
//delete video
router.delete('/:id', verifyToken, videoController.deleteVideo);
//get video
router.get('/find/:id', videoController.getVideo);
//update views video
router.put('/view/:id', videoController.updateViews);
//get trending video
router.get('/trend', videoController.getTrendingVideo);
//get random video
router.get('/random', videoController.getRandomVideo);
//get video from subscribed user
router.get('/sub', verifyToken, videoController.getSubVideo);
module.exports = router;
