import { errors as formidableErrors } from 'formidable';

// 1009 and 1016 not present in @types/formidable
// 1009 is for max file size exceeded
// 1016 is for max number of files allowed
export default {
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
