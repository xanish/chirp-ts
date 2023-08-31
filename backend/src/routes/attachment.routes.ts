// controllers
import AttachmentController from '../controllers/attachment-controller.js';

// middlewares
import verifyToken from '../middlewares/validate-token.middleware.js';

export default [
  {
    method: 'put',
    path: '/attachments',
    middlewares: [verifyToken],
    action: AttachmentController.store.bind(AttachmentController),
  },
];
