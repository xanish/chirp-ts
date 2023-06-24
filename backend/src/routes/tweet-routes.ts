import { checkSchema } from 'express-validator';

// controllers
import LikeController from '../controllers/like-controller.js';
import ReplyController from '../controllers/reply-controller.js';
import TweetController from '../controllers/tweet-controller.js';

export default [
  {
    method: 'get',
    path: '/tweets',
    middlewares: [],
    action: TweetController.all.bind(TweetController),
  },
  {
    method: 'post',
    path: '/tweets',
    middlewares: [],
    action: TweetController.create.bind(TweetController),
  },
  {
    method: 'delete',
    path: '/tweets/:tweetId',
    middlewares: [],
    action: TweetController.delete.bind(TweetController),
  },
  {
    method: 'get',
    path: '/tweets/:tweetId/likes',
    middlewares: [],
    action: LikeController.findByTweet.bind(LikeController),
  },
  {
    method: 'put',
    path: '/tweets/:tweetId/likes',
    middlewares: [],
    action: LikeController.create.bind(LikeController),
  },
  {
    method: 'delete',
    path: '/tweets/:tweetId/likes',
    middlewares: [],
    action: LikeController.delete.bind(LikeController),
  },
  {
    method: 'get',
    path: '/tweets/:tweetId/replies',
    middlewares: [],
    action: ReplyController.findByTweet.bind(ReplyController),
  },
];
