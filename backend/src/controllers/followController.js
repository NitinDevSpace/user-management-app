const FollowService = require('../services/followService');

exports.followUser = async (req, res) => {
    const { followerId, followedId } = req.body;
    try {
        const follow = await FollowService.followUser(followerId, followedId);
        res.status(201).json(follow);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.unfollowUser = async (req, res) => {
    const { followerId, followedId } = req.body;
    try {
        await FollowService.unfollowUser(followerId, followedId);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getFollowers = async (req, res) => {
    const { userId } = req.params;
    try {
        const followers = await FollowService.getFollowers(userId);
        res.status(200).json(followers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getFollowing = async (req, res) => {
    const { userId } = req.params;
    try {
        const following = await FollowService.getFollowing(userId);
        res.status(200).json(following);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};