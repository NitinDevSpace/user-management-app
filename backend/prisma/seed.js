const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    const user1 = await prisma.user.create({
        data: {
            name: 'John Doe',
            email: 'john.doe@example.com',
            phone: '123-456-7890',
            dob: new Date('1990-01-01'),
            bio: 'Software Developer',
            imageUrl: 'https://example.com/image1.jpg',
        },
    });

    const user2 = await prisma.user.create({
        data: {
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            phone: '098-765-4321',
            dob: new Date('1992-02-02'),
            bio: 'Graphic Designer',
            imageUrl: 'https://example.com/image2.jpg',
        },
    });

    await prisma.follow.create({
        data: {
            followerId: user1.id,
            followedId: user2.id,
        },
    });

    console.log({ user1, user2 });
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });