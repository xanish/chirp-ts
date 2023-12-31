import { checkSchema } from '../bootstrap/express-validator.js';

// controllers
import FollowController from '../controllers/follow.controller.js';
import LikeController from '../controllers/like.controller.js';
import ReplyController from '../controllers/reply.controller.js';
import TweetController from '../controllers/tweet.controller.js';
import UserController from '../controllers/user.controller.js';

// validation schemas
import CreateDeleteUserFollowSchema from '../schemas/users/create-delete-user-follow.schema.js';
import FindManyUserFollowsSchema from '../schemas/users/find-many-user-follows.schema.js';
import FindManyUserLikesSchema from '../schemas/users/find-many-user-likes.schema.js';
import FindManyUserMediasSchema from '../schemas/users/find-many-user-medias.schema.js';
import FindManyUserSchema from '../schemas/users/find-many-user.schema.js';
import FindManyUserTweetsSchema from '../schemas/users/find-many-user-tweets.schema.js';
import FindOneUserSchema from '../schemas/users/find-one-user.schema.js';
import UpdateUserSchema from '../schemas/users/update-user.schema.js';

// middlewares
import validateRequest from '../middlewares/validate-request.middleware.js';
import verifyToken from '../middlewares/validate-token.middleware.js';

export default [
  {
    method: 'get',
    path: '/users',
    middlewares: [
      verifyToken,
      checkSchema(FindManyUserSchema),
      validateRequest,
    ],
    action: UserController.findMany.bind(UserController),
  },
  {
    method: 'get',
    path: '/users/:userId',
    middlewares: [verifyToken, checkSchema(FindOneUserSchema), validateRequest],
    action: UserController.findOne.bind(UserController),
  },
  {
    method: 'put',
    path: '/users/:userId',
    middlewares: [verifyToken, checkSchema(UpdateUserSchema), validateRequest],
    action: UserController.update.bind(UserController),
  },
  {
    method: 'get',
    path: '/users/:userId/tweets',
    middlewares: [
      verifyToken,
      checkSchema(FindManyUserTweetsSchema),
      validateRequest,
    ],
    action: TweetController.findByUser.bind(TweetController),
  },
  {
    method: 'get',
    path: '/users/:userId/replies',
    middlewares: [
      verifyToken,
      checkSchema(FindManyUserTweetsSchema),
      validateRequest,
    ],
    action: ReplyController.findByUser.bind(ReplyController),
  },
  {
    method: 'get',
    path: '/users/:userId/likes',
    middlewares: [
      verifyToken,
      checkSchema(FindManyUserLikesSchema),
      validateRequest,
    ],
    action: LikeController.findByUser.bind(LikeController),
  },
  {
    method: 'get',
    path: '/users/:userId/medias',
    middlewares: [
      verifyToken,
      checkSchema(FindManyUserMediasSchema),
      validateRequest,
    ],
    action: TweetController.findMediaByUser.bind(TweetController),
  },
  {
    method: 'get',
    path: '/users/:userId/followers',
    middlewares: [
      verifyToken,
      checkSchema(FindManyUserFollowsSchema),
      validateRequest,
    ],
    action: FollowController.followersByUser.bind(FollowController),
  },
  {
    method: 'get',
    path: '/users/:userId/following',
    middlewares: [
      verifyToken,
      checkSchema(FindManyUserFollowsSchema),
      validateRequest,
    ],
    action: FollowController.followingByUser.bind(FollowController),
  },
  {
    method: 'put',
    path: '/users/:userId/followers',
    middlewares: [
      verifyToken,
      checkSchema(CreateDeleteUserFollowSchema),
      validateRequest,
    ],
    action: FollowController.create.bind(FollowController),
  },
  {
    method: 'delete',
    path: '/users/:userId/followers',
    middlewares: [
      verifyToken,
      checkSchema(CreateDeleteUserFollowSchema),
      validateRequest,
    ],
    action: FollowController.delete.bind(FollowController),
  },
];
