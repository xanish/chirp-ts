import { NextFunction, Request, Response } from 'express';
import formidable, { errors as formidableErrors, Part } from 'formidable';
import mime from 'mime-types';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import util from 'util';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import BaseController from './base-controller.js';

class AttachmentController extends BaseController {
  // 1009 and 1016 not present in @types/formidable
  protected errorMap = {
    [formidableErrors.aborted]: 'Upload aborted',
    [formidableErrors.filenameNotString]: 'File name is not a valid string',
    [formidableErrors.smallerThanMinFileSize]:
      'File size is lower than the allowed minimum of 1B',
    1009: 'File size exceeds the allowed maximum of 5MB',
    [formidableErrors.biggerThanMaxFileSize]:
      'File size exceeds the allowed maximum of 5MB',
    [formidableErrors.missingContentType]: 'Invalid file format',
    [formidableErrors.malformedMultipart]: 'Invalid file format',
    [formidableErrors.missingMultipartBoundary]: 'Bad upload request',
    [formidableErrors.unknownTransferEncoding]: 'Bad upload request',
    1016: 'Can only upload upto 4 files',
  };

  moveUploadedFiles(src: string, dest: string) {
    const input = fs.createReadStream(src);
    const output = fs.createWriteStream(dest);

    return new Promise((resolve, reject) => {
      output.on('error', reject);
      input.on('error', reject);
      input.on('end', resolve);
      input.pipe(output);
    });
  }

  async store(req: Request, res: Response, next: NextFunction) {
    // need to upload multiple files together so promisify the copyFile function
    // note fs.rename may not work since most platforms don't allow directly moving
    // from temp to another drive using just rename
    const moveFileAsync = util.promisify(fs.copyFile);

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
      async (err: any, fields: formidable.Fields, files: formidable.Files) => {
        // return any validation errors raised by formidable
        if (err) {
          return res.status(err.httpCode).json({
            files: {
              code: err.code,
              messages: [this.errorMap[err.code]],
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

              return moveFileAsync(src, dest);
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
    );
  }
}

export default new AttachmentController();
