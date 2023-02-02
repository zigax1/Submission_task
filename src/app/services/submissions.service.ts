import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { SubmissionTask } from '../models/SubmissionTask';

@Injectable({
  providedIn: 'root',
})
export class SubmissionsService {
  private submissions: SubmissionTask[] = [];

  private subject = new Subject<SubmissionTask[]>();

  changeData(submissions: SubmissionTask[]) {
    this.submissions = submissions;
    this.subject.next(this.submissions);
  }
  onChangeData(): Observable<SubmissionTask[]> {
    return this.subject.asObservable();
  }
  getData() {
    return this.submissions;
  }
}
