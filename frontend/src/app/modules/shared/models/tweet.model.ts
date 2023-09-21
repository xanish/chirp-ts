import { environment } from '../../../../environments/environment';
import { TweetType } from '../enums/tweet-type.enum';
import { TAttachment } from '../types/attachment.type';
import { TTweet } from '../types/tweet.type';
import { User } from './user.model';

export class Tweet {
  public id: string;
  public type: TweetType;
  public content: string;
  public user: User;
  public attachments: Array<TAttachment>;
  public related?: Tweet;
  public count = {
    replies: 0,
    retweets: 0,
    likes: 0,
  };
  public createdAt: Date;
  public updatedAt: Date;

  constructor(tweet: Partial<TTweet>) {
    this.id = tweet.id ?? '';
    this.type = tweet.type ?? TweetType.TWEET;
    this.content = tweet.content ?? '';
    this.user = new User(tweet.user ?? {});
    this.attachments =
      tweet.attachments?.map((attachment: TAttachment) => {
        attachment.content = `${environment.api_url}/media/${attachment.content}`;
        return attachment;
      }) ?? [];
    this.related = tweet.related ? new Tweet(tweet.related) : undefined;
    this.count.replies = tweet._count?.replies ?? 0;
    this.count.retweets = tweet._count?.retweets ?? 0;
    this.count.likes = tweet._count?.likes ?? 0;
    this.createdAt = tweet.createdAt ? new Date(tweet.createdAt) : new Date();
    this.updatedAt = tweet.updatedAt ? new Date(tweet.updatedAt) : new Date();
  }

  static default(): Tweet {
    return new Tweet({});
  }
}
