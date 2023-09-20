import { AttachmentType, PrismaClient, TweetType, User } from '@prisma/client';
import { Snowflake } from 'nodejs-snowflake';
import bcrypt from 'bcrypt';
import AppConfig from '../config/app-config.js';

const prisma: PrismaClient = new PrismaClient();
const snowflake = new Snowflake({
  custom_epoch: +AppConfig.SNOWFLAKE_EPOCH,
  instance_id: +AppConfig.APP_INSTANCE_ID,
});

async function getId(): Promise<bigint> {
  return new Promise((resolve) =>
    setTimeout(() => resolve(snowflake.getUniqueID().valueOf()), 50)
  );
}

const replies = [
  'Hey! how are you doing',
  'Hahahaha',
  'Good morning',
  'This is amazing',
  "You're back",
];
const ids = {
  alice: await getId(),
  bob: await getId(),
  charlie: await getId(),
  danish: await getId(),
};

const users = [
  {
    id: ids.alice,
    username: 'alice',
    password: await bcrypt.hash('pass@123', 10),
    firstName: 'Alice',
    email: 'alice@mail.com',
    birthDate: new Date('1995-01-01'),
    isVerified: true,
    tweets: [
      {
        id: await getId(),
        content: 'Today has been a good day',
        type: TweetType.TWEET,
      },
      {
        id: await getId(),
        content: 'Good Morning',
        type: TweetType.TWEET,
        attachments: {
          create: [
            {
              id: await getId(),
              type: AttachmentType.VIDEO,
              content: '4.mp4',
            },
          ],
        },
      },
    ],
    following: [ids.bob, ids.charlie, ids.danish],
  },
  {
    id: ids.bob,
    username: 'bob',
    password: await bcrypt.hash('pass@123', 10),
    firstName: 'Bobson',
    lastName: 'Bobby',
    email: 'bobby.b@mail.com',
    city: 'Budapest',
    country: 'Hungary',
    birthDate: new Date('1990-04-20'),
    isVerified: true,
    tweets: [
      {
        id: await getId(),
        content: 'Bobby Bobson is here!',
        type: TweetType.TWEET,
      },
      {
        id: await getId(),
        content: 'Hola amigos',
        type: TweetType.TWEET,
        attachments: {
          create: [
            {
              id: await getId(),
              type: AttachmentType.IMAGE,
              content: '2.jpg',
            },
          ],
        },
      },
    ],
    following: [ids.charlie],
  },
  {
    id: ids.charlie,
    username: 'charlie',
    password: await bcrypt.hash('pass@123', 10),
    firstName: 'Charlie',
    email: 'charlie@mail.com',
    city: 'Berlin',
    isVerified: true,
    tweets: [
      {
        id: await getId(),
        content: 'Just the usual comedy today',
        type: TweetType.TWEET,
        attachments: {
          create: [
            {
              id: await getId(),
              type: AttachmentType.IMAGE,
              content: '3.jpg',
            },
          ],
        },
      },
      {
        id: await getId(),
        content: 'Good Morning',
        type: TweetType.TWEET,
      },
    ],
    following: [ids.bob],
  },
  {
    id: ids.danish,
    username: 'danish',
    password: await bcrypt.hash('pass@123', 10),
    firstName: 'Danish Ali',
    lastName: 'Furniturewala',
    email: 'danish@mail.com',
    city: 'Mumbai',
    country: 'India',
    birthDate: new Date('1995-04-07'),
    isVerified: true,
    tweets: [
      {
        id: await getId(),
        content: 'Hello! World',
        type: TweetType.TWEET,
      },
      {
        id: await getId(),
        content: 'Good Morning',
        type: TweetType.TWEET,
        attachments: {
          create: [
            {
              id: await getId(),
              type: AttachmentType.IMAGE,
              content: '1.jpg',
            },
          ],
        },
      },
      {
        id: await getId(),
        content: 'Medias',
        type: TweetType.TWEET,
        attachments: {
          create: [
            {
              id: await getId(),
              type: AttachmentType.IMAGE,
              content: '1.jpg',
            },
            {
              id: await getId(),
              type: AttachmentType.IMAGE,
              content: '2.jpg',
            },
            {
              id: await getId(),
              type: AttachmentType.IMAGE,
              content: '3.jpg',
            },
            {
              id: await getId(),
              type: AttachmentType.VIDEO,
              content: '4.mp4',
            },
          ],
        },
      },
    ],
    following: [ids.alice, ids.bob],
  },
];

/**
 * Create users and add some tweets on them
 * Make them follow a bunch of other users
 * Throw in some random replies to a bunch of tweets
 */
async function main() {
  for (let user of users) {
    const created = await prisma.user.upsert({
      where: { username: user.username },
      update: {},
      create: {
        id: user.id,
        username: user.username,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        city: user.city,
        country: user.country,
        birthDate: user.birthDate,
        isVerified: true,
        tweets: {
          create: user.tweets,
        },
      },
    });
  }

  for (let user of users) {
    for (let followId of user.following) {
      await prisma.follow.create({
        data: {
          followerId: user.id,
          followingId: followId,
        },
      });
    }
  }

  for (let user of users) {
    const tweets = await prisma.tweet.findMany({
      select: { id: true },
    });
    const tweetIds = tweets
      .map((tweet) => tweet.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    for (let id of tweetIds) {
      await prisma.tweet.create({
        data: {
          id: await getId(),
          content: replies[Math.floor(Math.random() * replies.length)],
          type: TweetType.REPLY,
          relatedId: id,
          userId: user.id,
        },
      });
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
    process.exit(0);
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
