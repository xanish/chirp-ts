// controllers
import AttachmentController from '../controllers/attachment-controller.js';

export default [
  {
    method: 'put',
    path: '/attachments',
    middlewares: [],
    action: AttachmentController.store.bind(AttachmentController),
  },
];
