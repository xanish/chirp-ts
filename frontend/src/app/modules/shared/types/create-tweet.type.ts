import { TweetType } from '../enums/tweet-type.enum';

export type CreateTweet = {
  type: TweetType;
  content?: string;
  userId: string;
  attachments?: Array<string>;
  relatedId?: string;
};
