import { checkSchema } from '../bootstrap/express-validator.js';

// controllers
import LikeController from '../controllers/like-controller.js';
import ReplyController from '../controllers/reply-controller.js';
import TweetController from '../controllers/tweet-controller.js';

// validation schemas
import CreateDeleteLikeTweetSchema from '../schemas/tweets/create-delete-like-tweet.schema.js';
import CreateTweetSchema from '../schemas/tweets/create-tweet.schema.js';
import DeleteTweetSchema from '../schemas/tweets/delete-tweet.schema.js';
import FindManyTweetLikesSchema from '../schemas/tweets/find-many-tweet.likes.js';
import FindManyTweetRepliesSchema from '../schemas/tweets/find-many-tweet.replies.js';
import FindOneTweetSchema from '../schemas/tweets/find-one-tweet.schema.js';

// middlewares
import validateRequest from '../middlewares/validate-request.middleware.js';
import verifyToken from '../middlewares/validate-token.middleware.js';

export default [
  {
    method: 'get',
    path: '/tweets',
    middlewares: [verifyToken],
    action: TweetController.findMany.bind(TweetController),
  },
  {
    method: 'post',
    path: '/tweets',
    middlewares: [verifyToken, checkSchema(CreateTweetSchema), validateRequest],
    action: TweetController.create.bind(TweetController),
  },
  {
    method: 'get',
    path: '/tweets/:tweetId',
    middlewares: [
      verifyToken,
      checkSchema(FindOneTweetSchema),
      validateRequest,
    ],
    action: TweetController.findOne.bind(TweetController),
  },
  {
    method: 'delete',
    path: '/tweets/:tweetId',
    middlewares: [verifyToken, checkSchema(DeleteTweetSchema), validateRequest],
    action: TweetController.delete.bind(TweetController),
  },
  {
    method: 'get',
    path: '/tweets/:tweetId/likes',
    middlewares: [
      verifyToken,
      checkSchema(FindManyTweetLikesSchema),
      validateRequest,
    ],
    action: LikeController.findByTweet.bind(LikeController),
  },
  {
    method: 'put',
    path: '/tweets/:tweetId/likes',
    middlewares: [
      verifyToken,
      checkSchema(CreateDeleteLikeTweetSchema),
      validateRequest,
    ],
    action: LikeController.create.bind(LikeController),
  },
  {
    method: 'delete',
    path: '/tweets/:tweetId/likes',
    middlewares: [
      verifyToken,
      checkSchema(CreateDeleteLikeTweetSchema),
      validateRequest,
    ],
    action: LikeController.delete.bind(LikeController),
  },
  {
    method: 'get',
    path: '/tweets/:tweetId/replies',
    middlewares: [
      verifyToken,
      checkSchema(FindManyTweetRepliesSchema),
      validateRequest,
    ],
    action: ReplyController.findByTweet.bind(ReplyController),
  },
];
