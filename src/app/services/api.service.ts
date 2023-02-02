import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SubmissionTask } from '../models/SubmissionTask';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.api;

  constructor(private http: HttpClient) {}

  getSubmissionTasks(): Observable<SubmissionTask[]> {
    const url = `${this.apiUrl}submissions`;
    return this.http.get<SubmissionTask[]>(url);
  }
}
