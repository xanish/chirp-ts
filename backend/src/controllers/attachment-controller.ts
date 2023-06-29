import { NextFunction, Request, Response } from 'express';
import formidable, { Part } from 'formidable';
import mime from 'mime-types';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import util from 'util';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import BaseController from './base-controller.js';
import AttachmentErrorsConfig from '../config/attachment-errors-config.js';

class AttachmentController extends BaseController {
  // need to upload multiple files together so promisify the copyFile function
  // note fs.rename may not work since most platforms don't allow directly moving
  // from temp to another drive using just rename
  moveFileAsync = util.promisify(fs.copyFile);

  async store(req: Request, res: Response, next: NextFunction) {
    // configure formidable
    const form = formidable({
      maxFiles: 4,
      maxFileSize: 5 * 1024 * 1024,
      filter: function (part: Part) {
        return !!(part.mimetype && part.mimetype.includes('image'));
      },
    });

    // file parsing logic
    form.parse(
      req,
      (err: any, fields: formidable.Fields, files: formidable.Files) => {
        this.handleUploads(res, next, err, fields, files);
      }
    );
  }

  async handleUploads(
    res: Response,
    next: NextFunction,
    err: any,
    fields: formidable.Fields,
    files: formidable.Files
  ) {
    // return any validation errors raised by formidable
    if (err) {
      return res.status(err.httpCode).json({
        files: {
          code: err.code,
          messages: [AttachmentErrorsConfig[err.code]],
        },
      });
    }

    const uploads = Array.isArray(files.attachments)
      ? files.attachments
      : [files.attachments];

    try {
      // wait for move to finish
      await Promise.all(
        uploads.map((file: formidable.File) => {
          const src = file.filepath.toString();
          const dest = path.join(
            __dirname,
            '../../public/media',
            `${file.newFilename}.${mime.extension(file.mimetype || 'jpg')}`
          );

          return this.moveFileAsync(src, dest);
        })
      );

      // return the uploaded image names to user so they can reuse them
      // on tweet creation
      return res.json({
        messages: ['Successfully uploaded files'],
        uploadedFiles: uploads.map(
          (file) =>
            `${file.newFilename}.${mime.extension(file.mimetype || 'jpg')}`
        ),
      });
    } catch (e) {
      next(e);
    }
  }
}

export default new AttachmentController();
