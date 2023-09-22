import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { faComments, faHeart } from '@fortawesome/free-regular-svg-icons';
import { faRetweet, faShareNodes } from '@fortawesome/free-solid-svg-icons';
import { TweetService } from 'src/app/modules/core/services/tweet.service';
import { environment } from 'src/environments/environment';
import { AttachmentType } from '../../enums/attachment-type.enum';
import { TweetLike } from '../../enums/tweet-like.enum';
import { TweetType } from '../../enums/tweet-type.enum';
import { Tweet } from '../../models/tweet.model';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css'],
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
  faShareNodes = faShareNodes;

  tweetType = TweetType;
  attachmentType = AttachmentType;

  constructor(
    private router: Router,
    private tweetService: TweetService
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

  openProfile($event: Event, username: string) {
    this.router.navigate([username]);
    $event.stopPropagation();
  }

  openTweet($event: Event, tweetId: string) {
    this.router.navigate(['tweets', tweetId]);
    $event.stopPropagation();
  }

  showRetweetOptions($event: Event, tweetId: string) {
    $event.stopPropagation();
  }

  toggleLikeTweet($event: Event, tweetId: string) {
    if (this.tweet.liked) {
      this.tweetService.unlike(tweetId).subscribe({
        next: (response: any) => {
          this.toggleLike.emit({ id: tweetId, action: TweetLike.UNLIKED });
        },
      });
    } else {
      this.tweetService.like(tweetId).subscribe({
        next: (response: any) => {
          this.toggleLike.emit({ id: tweetId, action: TweetLike.LIKED });
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
}
