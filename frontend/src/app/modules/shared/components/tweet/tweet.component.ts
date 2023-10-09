import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faComments, faHeart } from '@fortawesome/free-regular-svg-icons';
import {
  faRetweet,
  faShareNodes,
  faHeart as faSolidHeart,
} from '@fortawesome/free-solid-svg-icons';
import { AlertService } from 'src/app/modules/core/services/alert.service';
import { TweetService } from 'src/app/modules/core/services/tweet.service';
import { environment } from 'src/environments/environment';
import { AttachmentType } from '../../enums/attachment-type.enum';
import { TweetLike } from '../../enums/tweet-like.enum';
import { TweetType } from '../../enums/tweet-type.enum';
import { Tweet } from '../../models/tweet.model';
import { User } from '../../models/user.model';
import { TAttachment } from '../../types/attachment.type';
import { TTweet } from '../../types/tweet.type';
import { TweetModalComponent } from '../tweet-modal/tweet-modal.component';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css'],
  standalone: true,
  imports: [
    NgIf,
    FontAwesomeModule,
    NgClass,
    NgFor,
    DatePipe,
    TweetModalComponent,
  ],
})
export class TweetComponent {
  @Input({ required: true }) tweet: Tweet = Tweet.default();
  @Input() controls: boolean = true;
  @Output() toggleLike: EventEmitter<{
    id: string;
    action: TweetLike;
  }> = new EventEmitter();
  @Output() showAttachment: EventEmitter<{
    index: number;
    attachments: Array<TAttachment>;
  }> = new EventEmitter();

  faComments = faComments;
  faRetweet = faRetweet;
  faHeart = faHeart;
  faSolidHeart = faSolidHeart;
  faShareNodes = faShareNodes;

  tweetType = TweetType;
  attachmentType = AttachmentType;
  retweetOptions = false;
  tweetModal = false;
  relatedType: TweetType = TweetType.REPLY;
  relatedTweetId: string | null = null;

  constructor(
    private router: Router,
    private tweetService: TweetService,
    private alertService: AlertService
  ) {}

  get user(): User {
    return this.tweet.type === this.tweetType.RETWEET
      ? this.tweet.related!.user
      : this.tweet.user;
  }

  get displayTweet(): Tweet {
    return this.tweet.type === this.tweetType.RETWEET
      ? this.tweet.related!
      : this.tweet;
  }

  gridClasses(attachmentCount: number): string {
    switch (attachmentCount) {
      case 4:
      case 3:
        return 'grid-cols-2 grid-rows-2';
      case 2:
        return 'grid-cols-2 grid-rows-1';
      default:
        return 'grid-cols-1 grid-rows-1';
    }
  }

  openProfile($event: Event, username: null | string) {
    this.router.navigate([username ?? '']);
    $event.stopPropagation();
  }

  openTweet($event: Event, tweetId: string) {
    this.router.navigate(['tweets', tweetId]);
    $event.stopPropagation();
  }

  openReplyTweetModal($event: Event, tweetId: string) {
    this.relatedType = TweetType.REPLY;
    this.relatedTweetId = tweetId;
    this.tweetModal = true;
    $event.stopPropagation();
  }

  openQuoteRetweetModal($event: Event, tweetId: string) {
    this.relatedType = TweetType.QUOTE;
    this.relatedTweetId = tweetId;
    this.tweetModal = true;
    $event.stopPropagation();
  }

  openLightbox($event: Event, index: number) {
    // stop propagation first to prevent video playback on click
    $event.stopPropagation();
    this.showAttachment.emit({
      index: index,
      attachments: this.tweet.attachments,
    });
  }

  openLightboxForQuoteTweet(event: any) {
    this.showAttachment.emit({
      index: event.index,
      attachments: event.attachments,
    });
  }

  hideTweetModal() {
    if (this.retweetOptions) {
      this.retweetOptions = false;
    }
    this.relatedTweetId = null;
    this.tweetModal = false;
  }

  toggleRetweetOptions($event: Event, tweetId: string) {
    this.retweetOptions = !this.retweetOptions;
    $event.stopPropagation();
  }

  toggleLikeTweet($event: Event, tweetId: string) {
    if (this.tweet.liked) {
      this.tweetService.unlike(tweetId).subscribe({
        next: (response: any) => {
          this.toggleLike.emit({ id: tweetId, action: TweetLike.UNLIKED });
        },
        error: (e) => {
          this.alertService.error(e, 'Failed to unlike tweet');
        },
      });
    } else {
      this.tweetService.like(tweetId).subscribe({
        next: (response: any) => {
          this.toggleLike.emit({ id: tweetId, action: TweetLike.LIKED });
        },
        error: (e) => {
          this.alertService.error(e, 'Failed to like tweet');
        },
      });
    }
    $event.stopPropagation();
  }

  shareTweet($event: Event, tweetId: string) {
    const type = 'text/plain';
    const blob = new Blob([`${environment.app_url}/tweets/${tweetId}`], {
      type,
    });
    const data = [new ClipboardItem({ [type]: blob })];

    navigator.clipboard.write(data).then(() => {
      this.alertService.success('Copied tweet url to clipboard');
    });
    $event.stopPropagation();
  }

  newRetweet($event: Event, tweetId: string) {
    this.tweetService.retweet(tweetId).subscribe({
      next: (tweet: TTweet) => {},
      error: (e) => {
        this.alertService.error(e, 'Failed to retweet');
      },
    });
    this.retweetOptions = !this.retweetOptions;
    $event.stopPropagation();
  }
}
