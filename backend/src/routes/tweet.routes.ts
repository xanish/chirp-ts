import { checkSchema } from 'express-validator';

// controllers
import LikeController from '../controllers/like-controller.js';
import ReplyController from '../controllers/reply-controller.js';
import TweetController from '../controllers/tweet-controller.js';

// validation schemas
import CreateDeleteLikeTweetSchema from '../schemas/tweets/create-delete-like-tweet-schema.js';
import CreateTweetSchema from '../schemas/tweets/create-tweet-schema.js';
import DeleteTweetSchema from '../schemas/tweets/delete-tweet-schema.js';
import FindManyTweetLikesSchema from '../schemas/tweets/find-many-tweet-likes.js';
import FindManyTweetRepliesSchema from '../schemas/tweets/find-many-tweet-replies.js';

// middlewares
import validateRequest from '../middlewares/validate-request.middleware.js';

export default [
  {
    method: 'get',
    path: '/tweets',
    middlewares: [],
    action: TweetController.findMany.bind(TweetController),
  },
  {
    method: 'post',
    path: '/tweets',
    middlewares: [checkSchema(CreateTweetSchema), validateRequest],
    action: TweetController.create.bind(TweetController),
  },
  {
    method: 'delete',
    path: '/tweets/:tweetId',
    middlewares: [checkSchema(DeleteTweetSchema), validateRequest],
    action: TweetController.delete.bind(TweetController),
  },
  {
    method: 'get',
    path: '/tweets/:tweetId/likes',
    middlewares: [checkSchema(FindManyTweetLikesSchema), validateRequest],
    action: LikeController.findByTweet.bind(LikeController),
  },
  {
    method: 'put',
    path: '/tweets/:tweetId/likes',
    middlewares: [checkSchema(CreateDeleteLikeTweetSchema), validateRequest],
    action: LikeController.create.bind(LikeController),
  },
  {
    method: 'delete',
    path: '/tweets/:tweetId/likes',
    middlewares: [checkSchema(CreateDeleteLikeTweetSchema), validateRequest],
    action: LikeController.delete.bind(LikeController),
  },
  {
    method: 'get',
    path: '/tweets/:tweetId/replies',
    middlewares: [checkSchema(FindManyTweetRepliesSchema), validateRequest],
    action: ReplyController.findByTweet.bind(ReplyController),
  },
];