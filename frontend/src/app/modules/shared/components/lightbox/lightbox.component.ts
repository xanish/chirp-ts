import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { AttachmentType } from '../../enums/attachment-type.enum';
import { TAttachment } from '../../types/attachment.type';

@Component({
  selector: 'app-lightbox',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './lightbox.component.html',
  styleUrls: ['./lightbox.component.css'],
})
export class LightboxComponent implements OnChanges {
  @Input() startAt: number = 0;
  @Input() attachments: Array<TAttachment> = [];
  @Output() close: EventEmitter<any> = new EventEmitter();

  faXmark = faXmark;
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;

  currentIndex = 0;
  attachmentType = AttachmentType;

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['startAt'].currentValue &&
      !isNaN(changes['startAt'].currentValue)
    ) {
      this.currentIndex = +changes['startAt'].currentValue;
    }
  }

  loadPreviousAttachment() {
    this.currentIndex = Math.max(this.currentIndex - 1, 0);
  }

  loadNextAttachment() {
    this.currentIndex = Math.min(
      this.currentIndex + 1,
      this.attachments.length - 1
    );
  }

  closeModal() {
    this.close.emit();
  }
}
