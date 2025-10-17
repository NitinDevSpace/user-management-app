const express = require('express');
const followController = require('../controllers/followController');

const router = express.Router();

router.post('/follow', followController.followUser);
router.post('/unfollow', followController.unfollowUser);
router.get('/:userId/followers', followController.getFollowers);
router.get('/:userId/following', followController.getFollowing);

module.exports = router;