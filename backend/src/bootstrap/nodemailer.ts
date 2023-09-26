import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import nodemailer from 'nodemailer';
import NodeMailerHandleBars from 'nodemailer-express-handlebars';
import AppConfig from '../config/app-config.js';

// todo: setup options
const NodeMailerTransporter = nodemailer.createTransport({});

NodeMailerTransporter.use(
  'compile',
  NodeMailerHandleBars({
    viewEngine: {},
    viewPath: path.join(__dirname, '..', 'mails'),
    extName: '.handlebars',
  })
);

export default NodeMailerTransporter;
