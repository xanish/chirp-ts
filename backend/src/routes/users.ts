import express, { Router } from 'express';

import * as FollowController from '../controllers/follow-controller.js';
import * as LikeController from '../controllers/like-controller.js';
import * as ReplyController from '../controllers/reply-controller.js';
import * as TweetController from '../controllers/tweet-controller.js';
import * as UserController from '../controllers/user-controller.js';

const router: Router = express.Router();

router.get('/', UserController.all);

router.get('/:userId', UserController.findOne);

router.post('/:userId', UserController.create);

router.put('/:userId', UserController.update);

router.get('/:userId/tweets', TweetController.findByUser);

router.get('/:userId/replies', ReplyController.findByUser);

router.get('/:userId/likes', LikeController.findByUser);

router.get('/:userId/followers', FollowController.followersByUser);

router.get('/:userId/following', FollowController.followingByUser);

export default router;
