const prisma = require('../prisma/client');

const userService = {
    getAllUsers: async () => {
        return await prisma.user.findMany({
            include: {
                followers: true,
                following: true,
            },
        });
    },

    createUser: async (userData) => {
        return await prisma.user.create({
            data: userData,
        });
    },

    getUserById: async (id) => {
        return await prisma.user.findUnique({
            where: { id: Number(id) },
            include: {
                followers: true,
                following: true,
            },
        });
    },

    updateUser: async (id, userData) => {
        return await prisma.user.update({
            where: { id: Number(id) },
            data: userData,
        });
    },

    deleteUser: async (id) => {
        return await prisma.user.delete({
            where: { id: Number(id) },
        });
    },
};

module.exports = userService;