import { Component, Input } from '@angular/core';
import { AttachmentType } from '../../enums/attachment-type.enum';
import { Tweet } from '../../models/tweet.model';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css'],
})
export class TweetComponent {
  @Input({ required: true }) tweet: Tweet = Tweet.default();
  attachmentType = AttachmentType;
}
