import { TweetType } from '../enums/tweet-type.enum';
import { TAttachment } from './attachment.type';
import { TUser } from './user.type';

export type TTweet = {
  id: string;
  content: string;
  type: TweetType;
  related: Partial<TTweet>;
  likes: Array<any>;
  _count: {
    replies: number;
    retweets: number;
    likes: number;
  };
  user: Partial<TUser>;
  attachments: Array<TAttachment>;
  createdAt: string;
  updatedAt: string;
};
