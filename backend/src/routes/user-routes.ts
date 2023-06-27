import { checkSchema } from 'express-validator';

// controllers
import FollowController from '../controllers/follow-controller.js';
import LikeController from '../controllers/like-controller.js';
import ReplyController from '../controllers/reply-controller.js';
import TweetController from '../controllers/tweet-controller.js';
import UserController from '../controllers/user-controller.js';

// validation schemas
import CreateDeleteUserFollowSchema from '../schemas/users/create-delete-user-follow-schema.js';
import CreateUserSchema from '../schemas/users/create-user-schema.js';
import FindManyUserLikesSchema from '../schemas/users/find-many-user-likes.js';
import FindManyUserSchema from '../schemas/users/find-many-user-schema.js';
import FindManyUserTweetsSchema from '../schemas/users/find-many-user-tweets-schema.js';
import FindOneUserSchema from '../schemas/users/find-one-user-schema.js';
import UpdateUserSchema from '../schemas/users/update-user-schema.js';

// middlewares
import validateRequest from '../middlewares/validate-request.js';

export default [
  {
    method: 'get',
    path: '/users',
    middlewares: [checkSchema(FindManyUserSchema), validateRequest],
    action: UserController.findMany.bind(UserController),
  },
  {
    method: 'get',
    path: '/users/:userId',
    middlewares: [checkSchema(FindOneUserSchema), validateRequest],
    action: UserController.findOne.bind(UserController),
  },
  {
    method: 'post',
    path: '/users',
    middlewares: [checkSchema(CreateUserSchema), validateRequest],
    action: UserController.create.bind(UserController),
  },
  {
    method: 'put',
    path: '/users/:userId',
    middlewares: [checkSchema(UpdateUserSchema), validateRequest],
    action: UserController.update.bind(UserController),
  },
  {
    method: 'get',
    path: '/users/:userId/tweets',
    middlewares: [checkSchema(FindManyUserTweetsSchema), validateRequest],
    action: TweetController.findByUser.bind(TweetController),
  },
  {
    method: 'get',
    path: '/users/:userId/replies',
    middlewares: [checkSchema(FindManyUserTweetsSchema), validateRequest],
    action: ReplyController.findByUser.bind(ReplyController),
  },
  {
    method: 'get',
    path: '/users/:userId/likes',
    middlewares: [checkSchema(FindManyUserLikesSchema), validateRequest],
    action: LikeController.findByUser.bind(LikeController),
  },
  {
    method: 'get',
    path: '/users/:userId/followers',
    middlewares: [],
    action: FollowController.followersByUser.bind(FollowController),
  },
  {
    method: 'get',
    path: '/users/:userId/following',
    middlewares: [],
    action: FollowController.followingByUser.bind(FollowController),
  },
  {
    method: 'put',
    path: '/users/:userId/followers',
    middlewares: [checkSchema(CreateDeleteUserFollowSchema), validateRequest],
    action: FollowController.create.bind(FollowController),
  },
  {
    method: 'delete',
    path: '/users/:userId/followers',
    middlewares: [checkSchema(CreateDeleteUserFollowSchema), validateRequest],
    action: FollowController.delete.bind(FollowController),
  },
];
