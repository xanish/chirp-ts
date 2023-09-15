import { AttachmentType } from '../enums/attachment-type.enum';

export type TAttachment = {
  id: string;
  type: AttachmentType;
  content: string;
};
