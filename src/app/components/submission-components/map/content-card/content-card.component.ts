import { Component, Input } from '@angular/core';
import { SubmissionTask } from 'src/app/models/SubmissionTask';

@Component({
  selector: 'app-content-card',
  templateUrl: './content-card.component.html',
  styleUrls: ['./content-card.component.scss'],
})
export class ContentCardComponent {
  @Input() submission!: SubmissionTask;
}
