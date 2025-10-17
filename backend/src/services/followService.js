const prisma = require('../prisma/client');

const followUser = async (followerId, followedId) => {
    return await prisma.follow.create({
        data: {
            follower: { connect: { id: followerId } },
            followed: { connect: { id: followedId } },
        },
    });
};

const unfollowUser = async (followerId, followedId) => {
    return await prisma.follow.deleteMany({
        where: {
            followerId: followerId,
            followedId: followedId,
        },
    });
};

const getFollowers = async (userId) => {
    return await prisma.follow.findMany({
        where: { followedId: userId },
        include: { follower: true },
    });
};

const getFollowing = async (userId) => {
    return await prisma.follow.findMany({
        where: { followerId: userId },
        include: { followed: true },
    });
};

module.exports = {
    followUser,
    unfollowUser,
    getFollowers,
    getFollowing,
};