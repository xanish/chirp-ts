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
import { TokenService } from 'src/app/modules/core/services/token.service';
import { TweetService } from 'src/app/modules/core/services/tweet.service';
import { environment } from 'src/environments/environment';
import { AttachmentType } from '../../enums/attachment-type.enum';
import { TweetLike } from '../../enums/tweet-like.enum';
import { TweetType } from '../../enums/tweet-type.enum';
import { Tweet } from '../../models/tweet.model';
import { TTweet } from '../../types/tweet.type';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css'],
  standalone: true,
  imports: [NgIf, FontAwesomeModule, NgClass, NgFor, DatePipe],
})
export class TweetComponent {
  @Input({ required: true }) tweet: Tweet = Tweet.default();
  @Output() toggleLike: EventEmitter<{
    id: string;
    action: TweetLike;
  }> = new EventEmitter();

  faComments = faComments;
  faRetweet = faRetweet;
  faHeart = faHeart;
  faSolidHeart = faSolidHeart;
  faShareNodes = faShareNodes;

  tweetType = TweetType;
  attachmentType = AttachmentType;
  retweetOptions = false;

  constructor(
    private router: Router,
    private tweetService: TweetService,
    private tokenService: TokenService,
    private alertService: AlertService
  ) {}

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
      console.log('Copied tweet url to clipboard');
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
