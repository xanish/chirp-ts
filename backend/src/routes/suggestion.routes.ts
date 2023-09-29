import FollowController from '../controllers/follow.controller.js';

import verifyToken from '../middlewares/validate-token.middleware.js';

export default [
  {
    method: 'get',
    path: '/suggestions/follows',
    middlewares: [verifyToken],
    action: FollowController.suggestions.bind(FollowController),
  },
];
