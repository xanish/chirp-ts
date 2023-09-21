import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { faComments, faHeart } from '@fortawesome/free-regular-svg-icons';
import { faRetweet, faShareNodes } from '@fortawesome/free-solid-svg-icons';
import { AttachmentType } from '../../enums/attachment-type.enum';
import { TweetType } from '../../enums/tweet-type.enum';
import { Tweet } from '../../models/tweet.model';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css'],
})
export class TweetComponent {
  faComments = faComments;
  faRetweet = faRetweet;
  faHeart = faHeart;
  faShareNodes = faShareNodes;

  @Input({ required: true }) tweet: Tweet = Tweet.default();
  tweetType = TweetType;
  attachmentType = AttachmentType;

  constructor(private router: Router) {}

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

  likeTweet($event: Event, tweetId: string) {
    $event.stopPropagation();
  }

  shareTweet($event: Event, tweetId: string) {
    $event.stopPropagation();
  }
}
